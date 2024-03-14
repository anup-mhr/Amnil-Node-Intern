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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const dbConfig_1 = require("../config/dbConfig");
const confimationMailTemp_1 = require("../emailTemplates/confimationMailTemp");
const Event_1 = require("../models/Event");
const EventRegistration_1 = require("../models/EventRegistration");
const logger_1 = __importDefault(require("../utils/logger"));
const sendEmail_1 = require("../utils/sendEmail");
const userService_1 = require("./userService");
exports.eventService = {
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!eventData.title || !eventData.description || !eventData.event_date || !eventData.price) {
                    throw new Error("Insufficient information");
                }
                const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
                const data = yield eventRepository.save(eventData);
                return data;
            }
            catch (error) {
                logger_1.default.error(error, "something wrong in eventService");
                throw error;
            }
        });
    },
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
            const data = yield eventRepository.find();
            return data;
        });
    },
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
            const data = yield eventRepository.findOneBy({ event_id: id });
            if (!data)
                throw new Error("Not Found");
            return data;
        });
    },
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
            const event = yield eventRepository.findOneBy({ event_id: id });
            if (!event) {
                throw new Error("Event not found");
            }
            yield eventRepository.remove(event);
        });
    },
    registerEvent(event_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
            const registerRepository = dbConfig_1.AppDataSource.getRepository(EventRegistration_1.EventRegistration);
            //VALIDATING EVENT
            const event = yield eventRepository.findOneBy({ event_id });
            if (!event) {
                throw new Error("Event not found");
            }
            //VALIDATING SEATS
            if (event.seats === 0) {
                throw new Error("Sorry, No seats are available!");
            }
            //UPADTING SEATS
            event.seats--;
            yield eventRepository.save(event);
            const eventRegister = new EventRegistration_1.EventRegistration();
            eventRegister.event_id = event_id;
            eventRegister.user_id = user_id;
            const data = yield registerRepository.save(eventRegister);
            //SENDING CONFIRMATION MAIL
            const mailTo = (_a = (yield userService_1.userService.getUserById(user_id))) === null || _a === void 0 ? void 0 : _a.email;
            if (!mailTo)
                throw new Error("mail not found");
            const emailTemplate = (0, confimationMailTemp_1.confirmationMailTemp)(event, mailTo);
            (0, sendEmail_1.sendEmail)(emailTemplate, mailTo, "Confirmation Mail");
            logger_1.default.info(`Confirmation Email sent to ${mailTo}`);
            return data;
        });
    },
    getEventsByDate(currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRepository = dbConfig_1.AppDataSource.getRepository(Event_1.Event);
            currentDate.setHours(0, 0, 0, 0);
            const data = yield eventRepository.find({
                where: {
                    event_date: currentDate,
                },
            });
            return data;
        });
    },
};
