import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { Message } from "../models/Message";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE, NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432", 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: NODE_ENV === "dev",
  entities: [User, Room, Message],
  subscribers: [],
  migrations: [],
});
