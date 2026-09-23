import { connection } from '../util/connection';
import { Admin } from '../model/admin';

export class AdminDAO {
    public async register(admin: Admin): Promise<void> {//Alterar quando criar o banco de dados, para ficar de acordo com a tabela
        try {
            await connection.query(
                'INSERT INTO administrators (id, name, email, hashPassword, role, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [admin.id, admin.name, admin.email, admin.password, admin.role, admin.active, admin.createdAt]
            );
        } catch (error: any) {
            throw new Error('Error registering admin: ' + error.message);
        }
    }

    public async findById(id: string): Promise<Admin | null> {
        try {
            const [rows]: any = await connection.query(
                'SELECT * FROM administrators WHERE id = ?',
                [id]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];
            return Admin.reconstruct({
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.hashPassword,
                role: row.role,
                active: !!row.active,
                createdAt: row.createdAt,
            });
        } catch (error: any) {
            throw new Error('Error finding admin by id: ' + error.message);
        }
    }

    public async updateById(id: string, admin: Admin): Promise<void> {
        try {
            await connection.query(
                'UPDATE administrators SET name = ?, email = ?, hashPassword = ?, role = ?, active = ? WHERE id = ?',
                [admin.name, admin.email, admin.password, admin.role, admin.active, id]
            );
        } catch (error: any) {
            throw new Error('Error updating admin: ' + error.message);
        }
    }
}
    
   
    