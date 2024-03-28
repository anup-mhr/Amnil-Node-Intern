import { Response, Request, NextFunction } from "express";
import { roomService } from "../services/roomService";

export const roomCotroller = {
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roomService.createRoom(req.body);
      res.status(201).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roomService.getRoomById(req.params.roomId);
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      await roomService.removeRoom(req.params.roomId);
      res.status(204).json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};
