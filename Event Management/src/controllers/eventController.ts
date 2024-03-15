import { Response, Request, NextFunction } from "express";
import { eventService } from "../services/eventService";
import { User } from "../models/User";

interface CustomRequest extends Request {
  user?: User;
}

export const eventController = {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.createEvent(req.body);
      res.status(201).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getEvents();
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getEventById(req.params.eventId);
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.deleteEvent(req.params.eventId);
      res.status(204).json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async registerEvent(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new Error("User not found");
      const data = await eventService.registerEvent(req.params.eventId, req.user.user_id);
      res.status(201).json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEventsByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const currentDate = new Date();
      const data = await eventService.getEventsByDate(currentDate);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
