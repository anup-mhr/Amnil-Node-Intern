import { Response, Request, NextFunction } from "express";
import { userService } from "../services/userService";

export const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.createUser(req.body);
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
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

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.getUsers();
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.getUserById(req.params.userId);
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.deleteUser(req.params.userId);
      res.json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
