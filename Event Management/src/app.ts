import express, { NextFunction, Request, Response } from "express";
import logger from "./utils/logger";
import userRouter from "./routes/userRoute";
import eventRouter from "./routes/eventRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { CronJob } from "cron";
import { sendEmail } from "./utils/sendEmail";
import { eventListMailTemp } from "./emailTemplates/eventListMailTemp";
import { eventService } from "./services/eventService";
import AppError from "./utils/AppError";

// import { eventService } from "./services/eventService";

const app = express();

app.use(express.json()); //for parsing json
app.use(express.urlencoded({ extended: false })); //for reading form data

//ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/event", eventRouter);

// eventService.getEventsByDate();

// Schedule cron job to send email
const admin_mail = process.env.ADMIN_EMAIL;
const cron_schedule = process.env.CRON_SCHEDULE;
if (!admin_mail || !cron_schedule) throw new AppError("no admin mail or cron_schedule in env");
const job = new CronJob(
  cron_schedule,
  async function () {
    sendEmail(
      eventListMailTemp(await eventService.getEventsByDate(new Date())),
      admin_mail,
      "List of today events",
    );
  },
  null, // onComplete
  true, // start
  "Asia/Kathmandu", // timeZone
);
job.start();

// Invalid url handling middleware
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  logger.error(`Can't find ${req.originalUrl} on this server`);
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Global error handling middleware
app.use(globalErrorHandler);

export default app;
