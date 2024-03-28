import { Response, Request, NextFunction } from "express";
import { userService } from "../services/userService";

export const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.createUser(req.body);
      res.status(201).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await userService.login(req.body);
      res.status(200).json({
        status: "success",
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      //   req.cookies('jwt', '',0)
      res.status(204).json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};
