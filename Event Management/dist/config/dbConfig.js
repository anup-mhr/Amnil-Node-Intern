"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
const EventRegistration_1 = require("../models/EventRegistration");
dotenv_1.default.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE, NODE_ENV } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432", 10),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: NODE_ENV === "dev",
    entities: [User_1.User, Event_1.Event, EventRegistration_1.EventRegistration],
    subscribers: [],
    migrations: [],
});
