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
    path: '/user'
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

            //Adiconar deopis verificar se o email existe no banco de dados

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

    public async searchByEmail(email: string) {
        const admin = await this.adminService.searchByEmail(email);
    }
}