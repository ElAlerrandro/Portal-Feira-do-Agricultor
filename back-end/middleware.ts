import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {administratorRole} from './src/enums/administrator-role.enum'

interface AuthRequest extends Request {
    user?: any
}

export function authToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            res.status(401).json({ error: 'Authorization on header is missing' });
            return;
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(401).json({ error: 'Invalid aut horization format. Use: Bearer <token>' });
            return;
        }

        const token = parts[1]

        if (!token) {
            res.status(401).json({ error: 'Token is missing'});
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: any) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    res.status(401).json({error: 'Token has expired'});
                    return;
                }
                if (err instanceof jwt.JsonWebTokenError) {
                    res.status(401).json({ error: 'Invalid token'});
                    return;
                }
                res.status(401).json({ error: 'Token verification failed' })
                return;
            }
            req.user = user;
            next();
        }) } catch (error) {
                res.status(500).json({ error: 'Internal server error during authorization' });
    }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
        if (req.user == undefined) {
            res.status(401).json({ error: 'User is not authenticated' });
            return;
        }

        if (req.user.role !== administratorRole.Normal && req.user.role !== administratorRole.Master) {
            res.status(403).json({ error: 'Access denied. Admin role requiered' });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error during authorization' })
    }
}

export function requireMaster(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        if (req.user == undefined) {
            res.status(401).json({ error: 'User is not authenticated' });
            return;
        }

        if (req.user.role !== administratorRole.Master) {
            res.status(403).json({ error: 'Access denied. Admin role requiered' });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error during authorization' })
    }
}

export default authToken;

