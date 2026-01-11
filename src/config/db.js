import 'dotenv/config';
import { Sequelize } from 'sequelize';

const db_uri = process.env.DB_URI;

if (!db_uri) {
  throw new Error('DB_URI is missing from .env file');
}

const sequelize = new Sequelize(db_uri, {
  dialect: 'postgres',
  logging: false, // Turn off SQL logs in terminal
});

export default sequelize;
