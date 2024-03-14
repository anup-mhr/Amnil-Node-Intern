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
exports.eventController = void 0;
const eventService_1 = require("../services/eventService");
exports.eventController = {
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield eventService_1.eventService.createEvent(req.body);
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
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield eventService_1.eventService.getEvents();
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
    getEventById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield eventService_1.eventService.getEventById(req.params.eventId);
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
    deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield eventService_1.eventService.deleteEvent(req.params.eventId);
                res.json({
                    status: "success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    registerEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user)
                    throw new Error("User not found");
                const data = yield eventService_1.eventService.registerEvent(req.params.eventId, req.user.user_id);
                res.json({
                    status: "success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getEventsByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const data = yield eventService_1.eventService.getEventsByDate(currentDate);
                res.json({
                    status: "success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
