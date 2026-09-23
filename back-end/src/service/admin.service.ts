import { AdminDAO } from "../dao/admin.dao";
import { AdminCreateDTO, UpdateOwnProfileDTO, UpdateAdminByMasterDTO } from "../dto/admin.dto";
import { Admin } from "../model/admin";
import { PasswordCrypto } from './passwordCrypto';

export class AdminService {
    public constructor(private adminDAO: AdminDAO) {}

    public async register(adminCreateDTO: AdminCreateDTO) {
        try {
            adminCreateDTO.password = await PasswordCrypto.hashPassword(adminCreateDTO.password);
            const admin = Admin.construct(adminCreateDTO);

            await this.adminDAO.register(admin);
        } catch (error: any) {
            throw new Error('Error registering admin: ' + error.message);
        }
    }

    public async updateOwnProfile(id: string, updateOwnProfileDTO: UpdateOwnProfileDTO) {
        try {
            const admin = await this.adminDAO.findById(id);
            if (!admin) {
                throw new Error('Admin not found');
            }

            const name = updateOwnProfileDTO.name !== undefined
            ? updateOwnProfileDTO.name : admin.name

            const password = updateOwnProfileDTO.password !== undefined
            ? await PasswordCrypto.hashPassword(updateOwnProfileDTO.password) : admin.password

            const updatedAdmin = Admin.reconstruct({
                id: admin.id,
                name,
                email: admin.email,
                password,
                role: admin.role,
                active: admin.active,
                createdAt: admin.createdAt
            });
            await this.adminDAO.updateById(id, updatedAdmin);
        } catch (error: any) {
            throw new Error('Error updating own profile: ' + error.message);
        }
    }

    public async updateAdminByMaster(id: string, updateAdminByMasterDTO: UpdateAdminByMasterDTO) {
        try {
            const admin = await this.adminDAO.findById(id);
            if (!admin) {
                throw new Error('Admin not found');
            }

            const name = updateAdminByMasterDTO.name !== undefined
            ? updateAdminByMasterDTO.name : admin.name

            const email = updateAdminByMasterDTO.email !== undefined
            ? updateAdminByMasterDTO.email : admin.email

            const role = updateAdminByMasterDTO.role !== undefined
            ? updateAdminByMasterDTO.role : admin.role
            
            const active = updateAdminByMasterDTO.active !== undefined
            ? updateAdminByMasterDTO.active : admin.active
            
            const updatedAdmin = Admin.reconstruct({
                id: admin.id,
                name,
                email,
                password: admin.password,
                role,
                active,
                createdAt: admin.createdAt
            });
            await this.adminDAO.updateById(id, updatedAdmin);
        } catch (error: any) {
            throw new Error('Error updating admin by master: ' + error.message);
        }
    }
}