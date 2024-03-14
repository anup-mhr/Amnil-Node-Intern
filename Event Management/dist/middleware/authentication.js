"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const userService_1 = require("../services/userService");
exports.authentication = {
    verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("Starting token verification process");
                // 1) getting token and check its there
                if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
                    logger_1.default.error("Token not found in headers");
                    return next(new Error("You are not logged in! Please login to get access"));
                }
                const token = req.headers.authorization.split(" ")[1];
                // 2) validate token
                if (!process.env.JWT_SECRET) {
                    logger_1.default.fatal("JWT_SECRET not defined in env variable");
                    throw new Error("Internal Server Error");
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                logger_1.default.info("Token validated successfully");
                // 3) check if user still exist
                const user = yield userService_1.userService.getUserById(decoded.id);
                if (!user) {
                    logger_1.default.error("User belonging to this token does not exist");
                    return next(new Error("the user belonging to this token does o longer exist"));
                }
                logger_1.default.info("User retrieved successfully");
                // 4) grant access to protected routes
                req.user = user;
                next();
            }
            catch (err) {
                logger_1.default.error("Error occurred during token verification", { error: err });
                next(new Error("JWT token expired"));
            }
        });
    },
    restrictTo(...roles) {
        return (req, res, next) => {
            try {
                logger_1.default.info("Starting access restriction process");
                if (!req.user)
                    throw new Error("Internal Server rror");
                if (!roles.includes(req.user.role)) {
                    logger_1.default.fatal(`Unauthorized access attempt by user ${req.user.email}`);
                    return next(new Error("You do not have permission to perform this task"));
                }
                logger_1.default.info("User has permission to perform this task");
                next();
            }
            catch (err) {
                logger_1.default.error("Error occurred during access restriction", { error: err });
                next(err);
            }
        };
    },
};
