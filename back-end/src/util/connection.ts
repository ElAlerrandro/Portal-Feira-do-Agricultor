import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_portal_feira',
});