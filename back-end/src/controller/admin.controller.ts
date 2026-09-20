import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PasswordCrypto } from '../service/passwordCrypto'
import { AdminCreateDTO } from '../dto/admin.dto';
import { AdminService } from '../service/admin.service';


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
}