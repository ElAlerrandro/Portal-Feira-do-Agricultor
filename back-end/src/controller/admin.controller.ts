import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PasswordCrypto } from '../service/passwordCrypto'
import { AdminCreateDTO, AdminLoginDTO } from '../dto/admin.dto';
import { AdminService } from '../service/admin.service';
import { RefreshTokenDAO } from '../dao/refreshToken.dao';
import jwt from 'jsonwebtoken';

const refreshCookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/admin'
};

export class AdminController {
    private adminService: AdminService;

    constructor(adminService: AdminService) {
        this.adminService = adminService;
    }

    public async register(req: Request, res: Response ) {
        try {
            const adminCreateDTO = plainToInstance(AdminCreateDTO, req.body);
            const errors = await validate(adminCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            //Adiconar depois verificar se o email existe no banco de dados

            await this.adminService.register(adminCreateDTO);
            return res.status(201).json({message: 'Admin registered successfully'});
        } catch (error: any) {
            return res.status(500).json({error: error.message || 'Error registering admin'});
        }
    }

    public async login(req: Request, res: Response) {
        try{
            const adminLoginDTO = plainToInstance(AdminLoginDTO, req.body);
            const errors = await validate(adminLoginDTO);

            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            const admin = await this.adminService.searchByEmail(adminLoginDTO.email);

            if (!admin  || !admin.password  || !(await PasswordCrypto.verifyPassword(adminLoginDTO.password, admin.password))) {
                return res.status(401).json({error: 'Invalid email or password'});
            }

            const accessSecret = process.env.JWT_ACCESS_SECRET;
            const refreshSecret = process.env.JWT_REFRESH_SECRET;

            if (!accessSecret || !refreshSecret) {
                return res.status(500).json({error: 'JWT secrets are not configured'});
            }

            // Gerar o token de acesso, duração de 5 minutos
            const accessToken = jwt.sign({ adminId: admin.id}, accessSecret, { expiresIn: '5m' });

            const refreshTokenId = crypto.randomUUID();
            const refreshToken = jwt.sign({ adminId: admin.id }, refreshSecret, { expiresIn: '7d', jwtid: refreshTokenId });

            const refreshTokenDAO = new RefreshTokenDAO();
            const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
            await refreshTokenDAO.create(refreshTokenId, refreshToken, admin.id, refreshExpiresAt);
            res.cookie('refreshToken', refreshToken, refreshCookieOptions);
            res.status(200).json({ accessToken, userId: admin.id });
        }catch (error: any) {
            console.error('Error during login:', error);
            res.status(500).json({ error: error.message || 'Error during login' });
        }
    }

    public async refresh(req: Request, res: Response) {
        try{
            const refreshToken = (req as Request & { cookies?: Record<string, string> }).cookies?.refreshToken;
            if (!refreshToken) return res.status(401).json({ message: 'Refresh token is missing' });

            if (!process.env.JWT_REFRESH_SECRET) {
                throw new Error('JWT refresh secret is not configured');
            }

            const refreshTokenDAO = new RefreshTokenDAO();
            const storedToken = await refreshTokenDAO.findByToken(refreshToken);
            if (!storedToken) return res.status(401).json({ message: 'Invalid refresh token' });

            if (new Date(storedToken.expires_at).getTime() < Date.now()) {
                await refreshTokenDAO.deleteByToken(refreshToken);
                return res.status(401).json({ message: 'Refresh token has expired' });
            }

            let payload: any;
            try {
                payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            } catch (error) {
                await refreshTokenDAO.deleteByToken(refreshToken).catch(() => {});
                return res.status(401).json({ message: 'Invalid or expired refresh token' });
            }

            const adminId = payload.adminId;
            if (!payload.jti || payload.jti !== storedToken.id) {
                return res.status(401).json({ message: 'Invalid refresh token' })
            }

            if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT access secret is not configured');
            const newAccessToken = jwt.sign({ adminId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' });

            await refreshTokenDAO.deleteByToken(refreshToken);
            const newRefreshTokenId = crypto.randomUUID();
            const newRefreshToken = jwt.sign({ adminId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d', jwtid: newRefreshTokenId });
            const newRefreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await refreshTokenDAO.create(newRefreshTokenId, newRefreshToken, adminId, newRefreshExpiresAt);
        
            res.cookie('refreshToken', newRefreshToken, refreshCookieOptions);
            res.status(200).json({ accessToken: newAccessToken });
        } catch (error: any) {
            console.error('Error during token refresh:', error);
            res.status(500).json({ error: error.message || 'Error during token refresh' });
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            const refreshToken = (req as Request & { cookies?: Record<string, string> }).cookies?.refreshToken;
            if (!refreshToken) return res.status(400).json({ message: 'refreshToken is required' });

            const refreshTokenDAO = new RefreshTokenDAO();
            await refreshTokenDAO.deleteByToken(refreshToken);

            res.clearCookie('refreshToken', { ...refreshCookieOptions, maxAge: undefined });
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error: any) {
            console.error('Error during logout:', error);
            res.status(500).json({ error: error.message || 'Error during logout' });
        }
    }

    public async searchByEmail(email: string) {
        const admin = await this.adminService.searchByEmail(email);
        return admin;
    }
}