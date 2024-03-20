import { User } from "../models/User";
import { AppDataSource } from "../config/dbConfig";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { sendEmail } from "../utils/sendEmail";
import { accountConfirmation } from "../emailTemplates/accountConfirmation";

const signToken = (id: string, expireTime: string) => {
  if (!process.env.JWT_SECRET) {
    logger.fatal("JWT_SECRET not defined in env variable");
    throw new AppError("Internal Server Error", 500);
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });
};

export const userService = {
  async createUser(userData: Partial<User>): Promise<User | undefined> {
    try {
      if (!userData.email || !userData.password) {
        throw new AppError("Insufficient information", 400);
      }

      //hashing the password
      userData.password = await bcrypt.hash(userData.password, 12);

      const userRepository = AppDataSource.getRepository(User);
      const data = await userRepository.save(userData);

      //generating link token
      const token = signToken(data.user_id, "10h");

      //send confirmation email
      sendEmail(
        accountConfirmation(`http://localhost:3000/api/v1/user/verify/${token}`),
        userData.email,
        "Confirm your Email",
      );
      logger.info("confirmation email sent");

      logger.info(`New user created with user_id: ${data.user_id}`);
      return data;
    } catch (error) {
      logger.error(error, "something wrong in while creating user");
      throw error;
    }
  },

  async login(userData: Partial<User>): Promise<{ token: string; refreshToken: string }> {
    try {
      const { email, password } = userData;
      if (!email || !password) {
        throw new AppError("Please provide email and password", 400);
      }

      //2) check if user exist and password is correct
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        email,
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401);
      }

      //3) check if user is verified or not
      if (!user.isVerified) {
        throw new AppError("User is not verified", 401);
      }

      // 4) if everything is ok send token to user
      if (!process.env.JWT_EXPIRES_IN || !process.env.REFRESS_TOKEN_EXPIRES_IN) {
        throw new AppError("JWT expire date not given", 500);
      }
      const token = signToken(user.user_id, process.env.JWT_EXPIRES_IN);
      const refreshToken = signToken(user.user_id, process.env.REFRESS_TOKEN_EXPIRES_IN);
      logger.info({ user: user.user_id }, "User logged in Successfully");

      return { token, refreshToken };
    } catch (error) {
      logger.error(error, "something wrong in while logging");
      throw error;
    }
  },

  async refreshToken(refreshToken: string): Promise<{ token: string; newRefreshToken: string }> {
    try {
      if (!refreshToken) {
        throw new AppError("Refresh token not provided", 400);
      }
      if (
        !process.env.JWT_EXPIRES_IN ||
        !process.env.REFRESS_TOKEN_EXPIRES_IN ||
        !process.env.JWT_SECRET
      ) {
        throw new AppError("Env variable not setup", 500);
      }
      const decode = jwt.verify(refreshToken, process.env.JWT_SECRET) as jwt.JwtPayload;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        user_id: decode.id,
      });

      if (!user) throw new AppError("Invalid refresh token", 404);

      const token = signToken(decode.id, process.env.JWT_EXPIRES_IN);
      const newRefreshToken = signToken(decode.id, process.env.REFRESS_TOKEN_EXPIRES_IN);
      return { token, newRefreshToken };
    } catch (error) {
      logger.error(error, "something wrong in while getting refresh token");
      throw new AppError("Invalid refresh token", 403);
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      if (!token) {
        throw new AppError("Invalid link address", 404);
      }
      if (!process.env.JWT_SECRET) {
        throw new AppError("Env variable not setup", 500);
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

      await AppDataSource.createQueryBuilder()
        .update(User)
        .set({
          isVerified: true,
        })
        .where("user_id = :user_id", { user_id: decode.id })
        .execute();
    } catch (error) {
      logger.error(error, "something wrong in while verifying email");
      throw new AppError("Invalid email verify link", 403);
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const data = await userRepository.find();
      logger.info("fetched users list");
      return data;
    } catch (error) {
      logger.error("Error occured while fetching users");
      throw error;
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const data = await userRepository.findOneBy({ user_id: id });
      if (!data) throw new AppError("User not found", 404);
      logger.info(data.user_id, "fetched user data of user_id");
      return data;
    } catch (error) {
      logger.info("Error occured while getting user");
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ user_id: id });
      if (!user) {
        throw new AppError("User not found", 404);
      }
      await userRepository.remove(user);
      logger.info(user, "Deleted user");
    } catch (error) {
      logger.info("Error occured while deleting user");
      throw error;
    }
  },
};
