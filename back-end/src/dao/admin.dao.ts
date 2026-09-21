import { connection } from '../util/connection';
import { Admin } from '../model/admin';

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
}