import { query } from './db';

interface User {
    id: number;
    name: string;
    age: number;
}

export class UserModel {
    constructor(public id: number, public name: string, public age: number) {}

    async save(): Promise<void> {
        try {
            const queryText = 'INSERT INTO users (id, name, age) VALUES ($1, $2, $3)';
            const values = [this.id, this.name, this.age];
            await query(queryText, values);
        } catch (error) {
            throw new Error(`Error saving user: ${error}`);
        }
    }

    static async find(): Promise<User[]> {
        try {
            const queryText = 'SELECT * FROM users';
            const { rows } = await query(queryText);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching users: ${error}`);
        }
    }
}
