"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const transport = pino_1.default.transport({
    targets: [
        {
            target: "pino-pretty",
            options: {
                destination: "./logs/output.log",
                mkdir: true,
                translateTime: "SYS:dd-mm-yyyy hh-mm-ss",
                ignore: "pid,hostname",
                colorize: false,
            },
        },
        {
            target: "pino-pretty",
            options: {
                destination: process.stdout.fd,
            },
        },
    ],
});
const logger = (0, pino_1.default)({
    level: process.env.PINO_LOG_LEVEL || "info",
    redact: {
        paths: ["email", "password", "address"],
        remove: true,
    },
}, transport);
exports.default = logger;
