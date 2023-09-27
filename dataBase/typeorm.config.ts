import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from './entity/user.entity';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'test',
  password: 'pass1234',
  database: process.env.DATABASE,
  entities: [User],
  synchronize: true,
});
