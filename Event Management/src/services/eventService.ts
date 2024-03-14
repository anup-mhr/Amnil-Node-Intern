import { AppDataSource } from "../config/dbConfig";
import { confirmationMailTemp } from "../emailTemplates/confimationMailTemp";
import { Event } from "../models/Event";
import { EventRegistration } from "../models/EventRegistration";
import logger from "../utils/logger";
import { sendEmail } from "../utils/sendEmail";
import { userService } from "./userService";

export const eventService = {
  async createEvent(eventData: Partial<Event>): Promise<Event | undefined> {
    try {
      if (!eventData.title || !eventData.description || !eventData.event_date || !eventData.price) {
        throw new Error("Insufficient information");
      }
      const eventRepository = AppDataSource.getRepository(Event);
      const data = await eventRepository.save(eventData);
      return data;
    } catch (error) {
      logger.error(error, "something wrong in eventService");
      throw error;
    }
  },

  async getEvents(): Promise<Event[]> {
    const eventRepository = AppDataSource.getRepository(Event);
    const data = await eventRepository.find();
    return data;
  },

  async getEventById(id: string): Promise<Event> {
    const eventRepository = AppDataSource.getRepository(Event);
    const data = await eventRepository.findOneBy({ event_id: id });
    if (!data) throw new Error("Not Found");
    return data;
  },

  async deleteEvent(id: string): Promise<void> {
    const eventRepository = AppDataSource.getRepository(Event);
    const event = await eventRepository.findOneBy({ event_id: id });
    if (!event) {
      throw new Error("Event not found");
    }
    await eventRepository.remove(event);
  },

  async registerEvent(event_id: string, user_id: string): Promise<EventRegistration> {
    const eventRepository = AppDataSource.getRepository(Event);
    const registerRepository = AppDataSource.getRepository(EventRegistration);

    //VALIDATING EVENT
    const event = await eventRepository.findOneBy({ event_id });
    if (!event) {
      throw new Error("Event not found");
    }

    //VALIDATING SEATS
    if (event.seats === 0) {
      throw new Error("Sorry, No seats are available!");
    }

    //UPADTING SEATS
    event.seats--;
    await eventRepository.save(event);

    const eventRegister = new EventRegistration();
    eventRegister.event_id = event_id;
    eventRegister.user_id = user_id;

    const data = await registerRepository.save(eventRegister);

    //SENDING CONFIRMATION MAIL
    const mailTo = (await userService.getUserById(user_id))?.email;
    if (!mailTo) throw new Error("mail not found");
    const emailTemplate = confirmationMailTemp(event, mailTo);
    sendEmail(emailTemplate, mailTo, "Confirmation Mail");

    logger.info(`Confirmation Email sent to ${mailTo}`);

    return data;
  },

  async getEventsByDate(currentDate: Date) {
    const eventRepository = AppDataSource.getRepository(Event);
    currentDate.setHours(0, 0, 0, 0);
    const data = await eventRepository.find({
      where: {
        event_date: currentDate,
      },
    });

    return data;
  },
};
