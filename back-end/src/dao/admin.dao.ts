import { connection } from '../util/connection';
import { Admin } from '../model/admin';
import { userInfo } from 'node:os';

export class AdminDAO {
    public async register(admin: Admin): Promise<void> {//Alterar quando criar o banco de dados, para ficar de acordo com a tabela
        try {
            const [result]: any = await connection.query(
                'INSERT INTO administrator (id, name, email, hashPassword, role, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [admin.id, admin.name, admin.email, admin.password, admin.role, admin.active, admin.createdAt]
            );
        } catch (error: any) {
            throw new Error('Error registering admin: ' + error.message);
        }
    }

    async searchByEmail(email: string): Promise<Admin | null> {
        try {
            const [admin]: any = await connection.query(
                'SELECT id, name, email, password, role, active, createdAt FROM administator WHERE email = ?',
                [email]
            );
            if (admin.length == 0) {
                return null;
            }
            return Admin.reconstruct(admin[0]);
        } catch (error: any) {
            throw new Error('Error searching admin by email: ' + error.message);
        }
    }
}