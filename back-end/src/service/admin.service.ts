import { AdminDAO } from "../dao/admin.dao";
import { AdminCreateDTO } from "../dto/admin.dto";
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
}