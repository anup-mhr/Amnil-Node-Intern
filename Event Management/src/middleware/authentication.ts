import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { userService } from "../services/userService";
import { User } from "../models/User";

interface CustomRequest extends Request {
  user?: User;
}

export const authentication = {
  async verify(req: CustomRequest, res: Response, next: NextFunction): Promise<User | null | void> {
    try {
      logger.info("Starting token verification process");

      // 1) getting token and check its there
      if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        logger.error("Token not found in headers");
        return next(new Error("You are not logged in! Please login to get access"));
      }

      const token = req.headers.authorization.split(" ")[1];

      // 2) validate token
      if (!process.env.JWT_SECRET) {
        logger.fatal("JWT_SECRET not defined in env variable");
        throw new Error("Internal Server Error");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      logger.info("Token validated successfully");

      // 3) check if user still exist
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        logger.error("User belonging to this token does not exist");
        return next(new Error("the user belonging to this token does o longer exist"));
      }

      logger.info("User retrieved successfully");
      // 4) grant access to protected routes
      req.user = user;
      next();
    } catch (err) {
      logger.error("Error occurred during token verification", { error: err });
      next(new Error("JWT token expired"));
    }
  },

  restrictTo(...roles: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        logger.info("Starting access restriction process");
        if (!req.user) throw new Error("Internal Server rror");

        if (!roles.includes(req.user.role)) {
          logger.fatal(`Unauthorized access attempt by user ${req.user.email}`);
          return next(new Error("You do not have permission to perform this task"));
        }
        logger.info("User has permission to perform this task");
        next();
      } catch (err) {
        logger.error("Error occurred during access restriction", { error: err });
        next(err);
      }
    };
  },
};
