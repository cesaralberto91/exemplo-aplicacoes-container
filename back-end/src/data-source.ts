import "reflect-metadata";
import { DataSource } from "typeorm";

import { createUser1695154100118 } from "./database/migrations/1695154100118-create_user";

import User from "./models/User";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [createUser1695154100118],
  migrationsRun: true,
  subscribers: [],
});