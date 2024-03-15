import { AppDataSource } from "../config/dbConfig";
import { confirmationMailTemp } from "../emailTemplates/confimationMailTemp";
import { Event } from "../models/Event";
import { EventRegistration } from "../models/EventRegistration";
import AppError from "../utils/AppError";
import logger from "../utils/logger";
import { sendEmail } from "../utils/sendEmail";
import { userService } from "./userService";

export const eventService = {
  async createEvent(eventData: Partial<Event>): Promise<Event | undefined> {
    try {
      if (!eventData.title || !eventData.description || !eventData.event_date || !eventData.price) {
        throw new AppError("Insufficient information", 400);
      }
      const eventRepository = AppDataSource.getRepository(Event);
      const data = await eventRepository.save(eventData);
      logger.info(data, "Created new event");
      return data;
    } catch (error) {
      logger.error(error, "Error occured while creating event");
      throw error;
    }
  },

  async getEvents(): Promise<Event[]> {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const data = await eventRepository.find();
      logger.info("Fetched events list");
      return data;
    } catch (error) {
      logger.error(error, "Error occured while fetching events");
      throw error;
    }
  },

  async getEventById(id: string): Promise<Event> {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const data = await eventRepository.findOneBy({ event_id: id });
      if (!data) throw new AppError("Event Not Found", 404);
      logger.info(data.event_id, "Event fetched of event_id:");
      return data;
    } catch (error) {
      logger.error(error, "Error occured while fetching event");
      throw error;
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const event = await eventRepository.findOneBy({ event_id: id });
      if (!event) {
        throw new AppError("Event not found", 404);
      }
      await eventRepository.remove(event);
      logger.info(`Deleted event of event_id: ${id}`);
    } catch (error) {
      logger.error(error, "Error occured while deteting event");
      throw error;
    }
  },

  async registerEvent(event_id: string, user_id: string): Promise<EventRegistration> {
    try {
      logger.info({ event_id, user_id }, "Registering for event be a user");
      const eventRepository = AppDataSource.getRepository(Event);
      const registerRepository = AppDataSource.getRepository(EventRegistration);

      //VALIDATING EVENT
      const event = await eventRepository.findOneBy({ event_id });
      if (!event) {
        throw new AppError("Event not found", 404);
      }

      //VALIDATING SEATS
      if (event.seats === 0) {
        throw new AppError("Sorry, No seats are available!", 403);
      }

      //UPADTING SEATS
      event.seats--;
      await eventRepository.save(event);

      const eventRegister = new EventRegistration();
      eventRegister.event_id = event_id;
      eventRegister.user_id = user_id;

      const data = await registerRepository.save(eventRegister);
      logger.info(data, "Registerd for event");

      //SENDING CONFIRMATION MAIL
      logger.info(user_id, "sending mail to user");
      const mailTo = (await userService.getUserById(user_id))?.email;
      if (!mailTo) throw new AppError("mail not found", 404);
      const emailTemplate = confirmationMailTemp(event, mailTo);
      sendEmail(emailTemplate, mailTo, "Confirmation Mail");

      logger.info(`Confirmation Email sent to ${mailTo}`);

      return data;
    } catch (error) {
      logger.error("Error occured while registering event");
      throw error;
    }
  },

  async getEventsByDate(currentDate: Date) {
    try {
      const eventRepository = AppDataSource.getRepository(Event);
      currentDate.setHours(0, 0, 0, 0);
      const data = await eventRepository.find({
        where: {
          event_date: currentDate,
        },
      });
      logger.info(`Fetched events for date: ${currentDate}`);
      return data;
    } catch (error) {
      logger.error("Error occured while fetching event by date");
      throw error;
    }
  },
};
