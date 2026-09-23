import { AdminDAO } from "../dao/admin.dao";
import { AdminCreateDTO } from "../dto/admin.dto";
import { Admin } from "../model/admin";
import { PasswordCrypto } from './passwordCrypto';

export class AdminService {
    public constructor(private adminDAO: AdminDAO) {}

    public async register(adminCreateDTO: AdminCreateDTO) {
        try {
            if (!adminCreateDTO.name || !adminCreateDTO.email || !adminCreateDTO.password || !adminCreateDTO.role) {
                throw new Error('Missing required fields');
            }

            if (await this.searchByEmail(adminCreateDTO.email)) {
                throw new Error('Email already registered');
            }

            adminCreateDTO.password = await PasswordCrypto.hashPassword(adminCreateDTO.password);
            const admin = Admin.construct(adminCreateDTO);

            await this.adminDAO.register(admin);
        } catch (error: any) {
            throw new Error('Error registering admin: ' + error.message);
        }
    }

    public async searchByEmail(email: string): Promise <Admin | null> {
        const admin: Admin | null = await this.adminDAO.searchByEmail(email);
        if (admin) {
            return Admin.reconstruct(admin);
        }
        return null;
    }
}