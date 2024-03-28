import { Response, Request, NextFunction } from "express";
import { messageService } from "../services/messageService";

export const messageController = {
  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await messageService.createMessage(
        parseInt(req.params.userId),
        req.body.message,
      );
      res.status(201).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMessagesOfRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await messageService.getMessageByRoom(req.params.roomId);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
