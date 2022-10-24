import * as Mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const connection: Mysql.Connection = Mysql.createConnection({
  host: 'database',
  user: 'mysql',
  password: process.env.DB_PASSWORD,
  database: 'matcha',
});
