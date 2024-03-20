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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, refreshToken } = await userService.login(req.body);
      res.status(200).json({
        status: "success",
        token,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newRefreshToken } = await userService.refreshToken(req.body.refreshToken);
      res.status(200).json({
        status: "success",
        token,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.verifyEmail(req.params.token);
      res.status(200).json({
        status: "success",
        message: "Email has been verified",
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
      res.status(204).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
