import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newDB', 
    password: '9010',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Database connected');
});


pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = async (text: string, params?: any[]): Promise<QueryResult<any>> => {
    const result = await pool.query(text, params);
    return result;
};
