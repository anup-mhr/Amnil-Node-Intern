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
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const cron_1 = require("cron");
const sendEmail_1 = require("./utils/sendEmail");
const eventListMailTemp_1 = require("./emailTemplates/eventListMailTemp");
const eventService_1 = require("./services/eventService");
// import { eventService } from "./services/eventService";
const app = (0, express_1.default)();
app.use(express_1.default.json()); //for parsing json
app.use(express_1.default.urlencoded({ extended: false })); //for reading form data
//ROUTES
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/event", eventRoute_1.default);
// eventService.getEventsByDate();
// Schedule cron job to send email
const admin_mail = process.env.ADMIN_EMAIL;
const cron_schedule = process.env.CRON_SCHEDULE;
if (!admin_mail || !cron_schedule)
    throw new Error("no admin mail or cron_schedule in env");
const job = new cron_1.CronJob(cron_schedule, function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, sendEmail_1.sendEmail)((0, eventListMailTemp_1.eventListMailTemp)(yield eventService_1.eventService.getEventsByDate(new Date())), admin_mail, "List of today events");
    });
}, null, // onComplete
true, // start
"Asia/Kathmandu");
job.start();
// Invalid url handling middleware
app.all("*", (req, res) => {
    logger_1.default.error(`Can't find ${req.originalUrl} on this server`);
    res.status(505).json({ message: "Bad Request" });
});
//Global error handling middleware
app.use(globalErrorHandler_1.default);
exports.default = app;
