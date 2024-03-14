"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
exports.userController = {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.userService.createUser(req.body);
                res.status(200).json({
                    status: "success",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield userService_1.userService.login(req.body);
                res.status(200).json({
                    status: "success",
                    token,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.userService.getUsers();
                res.status(200).json({
                    status: "success",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.userService.getUserById(req.params.userId);
                res.status(200).json({
                    status: "success",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userService_1.userService.deleteUser(req.params.userId);
                res.json({
                    status: "success",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
