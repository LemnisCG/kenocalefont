import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Client } from './clients/entity/client.entity';
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5434', 10),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_NAME || 'kenocalefont',
    synchronize: false, // Disable synchronize for migrations
    logging: true,
    entities: [Client], // Add your entities here
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
