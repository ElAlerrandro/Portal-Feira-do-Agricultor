import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminCreateDTO, UpdateOwnProfileDTO, UpdateAdminByMasterDTO } from '../dto/admin.dto';
import { AdminService } from '../service/admin.service';
import { request } from 'http';

interface AuthRequest extends Request {
    user?: any 
}

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

            await this.adminService.register(adminCreateDTO);
            return res.status(201).json({ message: 'Admin registred succesfully' })
        } catch (error: any) {
            return res.status(500).json({error: 'Error registering admin'});
        }
    }

    public async updateOwnProfile(req: AuthRequest, res: Response) {
        try {
            const id = req.user.id
            const updateOwnProfileDTO = plainToInstance(UpdateOwnProfileDTO, req.body)
            const errors = await validate(updateOwnProfileDTO);

            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            await this.adminService.updateOwnProfile(id, updateOwnProfileDTO);
            return res.status(200).json({message: 'Profile updated successfully'});
        } catch (error: any) {
            return res.status(500).json({error: 'Error updating own profile'});
        }
    }

    public async updateAdminByMaster(req: AuthRequest, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

            const updateAdminByMasterDTO = plainToInstance (UpdateAdminByMasterDTO, req.body);
            const errors = await validate(updateAdminByMasterDTO);

            if (errors.length > 0) {
                return res.status(400).json({errors});
            }

            await this.adminService.updateAdminByMaster(id, updateAdminByMasterDTO);
            return res.status(200).json({message: 'Admin updated successfully'});
        } catch (error: any) {
            res.status(500).json({error: 'Error updating admin by master'})
        }
    }
}