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
exports.userService = void 0;
const User_1 = require("../models/User");
const dbConfig_1 = require("../config/dbConfig");
const logger_1 = __importDefault(require("../utils/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const signToken = (id) => {
    if (!process.env.JWT_SECRET) {
        logger_1.default.fatal("JWT_SECRET not defined in env variable");
        throw new Error("Internal Server Error");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.userService = {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userData.email || !userData.password) {
                    throw new Error("Invalid email or password");
                }
                //hashing the password
                userData.password = yield bcrypt_1.default.hash(userData.password, 12);
                const userRepository = dbConfig_1.AppDataSource.getRepository(User_1.User);
                const data = yield userRepository.save(userData);
                return data;
            }
            catch (error) {
                logger_1.default.error(error, "something wrong in userService");
            }
        });
    },
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userData;
                if (!email || !password) {
                    throw new Error("Please provide email and password");
                }
                //2) check if user exist and password is correct
                const userRepository = dbConfig_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepository.findOneBy({
                    email,
                });
                if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                    throw new Error("Incorrect email or password");
                }
                // 3) if everything is ok send token to user
                const token = signToken(user.user_id);
                logger_1.default.info({ user: user.user_id }, "User logged in Successfully");
                return token;
            }
            catch (error) {
                logger_1.default.error(error, "something wrong in userService");
                throw error;
            }
        });
    },
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = dbConfig_1.AppDataSource.getRepository(User_1.User);
            const data = yield userRepository.find();
            return data;
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = dbConfig_1.AppDataSource.getRepository(User_1.User);
            const data = yield userRepository.findOneBy({ user_id: id });
            return data;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = dbConfig_1.AppDataSource.getRepository(User_1.User);
            const user = yield userRepository.findOneBy({ user_id: id });
            if (!user) {
                throw new Error("User not found");
            }
            yield userRepository.remove(user);
        });
    },
};
