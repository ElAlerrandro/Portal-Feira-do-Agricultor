import { connection } from '../util/connection';

export type RefreshTokenRow = {
    id: string;
    token_hash: string;
    user_id: string;
    expires_at: Date;
    created_at: Date;
}

export class RefreshTokenDAO {
    async create(id: string, token: string, adminId: string, expiresAt: Date): Promise<void> {
        try {
            await connection.query(
                `INSERT INTO refresh_tokens (id, tokenHash, adminId, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?)`,
                [id, token, adminId, expiresAt, new Date()]
            );
        } catch (error) {
            console.error('Error creating refresh token:', error);
            throw new Error('Failed to create refresh token');
        }
    }

    async findByToken(token: string): Promise<RefreshTokenRow | null> {
        try {
            const [rows]: any = await connection.query('SELECT id, tokenHash, adminId, expiresAt, createdAt FROM refresh_tokens WHERE tokenHash = ?', [token]);
            if (rows.length === 0) return null;
            return rows[0];
        } catch (error) {
            console.error('Error finding refresh token:', error);
            throw new Error('Failed to find refresh token');
        }
    }

    async deleteByToken(token: string): Promise<void> {
        try {
            await connection.query('DELETE FROM refresh_tokens WHERE tokenHash = ?', [token]);
        } catch (error) {
            console.error('Error deleting refresh token:', error);
            throw new Error('Failed to delete refresh token');
        }
    }

    async deleteByUserId(userId: string): Promise<void> {
        try {
            await connection.query('DELETE FROM refresh_tokens WHERE adminId = ?', [userId]);
        } catch (error) {
            console.error('Error deleting refresh tokens for user:', error);
            throw new Error('Failed to delete refresh tokens for user');
        }
    }
}
