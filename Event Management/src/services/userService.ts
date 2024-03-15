import { User } from "../models/User";
import { AppDataSource } from "../config/dbConfig";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const signToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    logger.fatal("JWT_SECRET not defined in env variable");
    throw new AppError("Internal Server Error", 500);
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
      logger.info(`New user created with user_id: ${data.user_id}`);
      return data;
    } catch (error) {
      logger.error(error, "something wrong in while creating user");
      throw error;
    }
  },

  async login(userData: Partial<User>): Promise<string | undefined> {
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

      // 3) if everything is ok send token to user
      const token = signToken(user.user_id);
      logger.info({ user: user.user_id }, "User logged in Successfully");

      return token;
    } catch (error) {
      logger.error(error, "something wrong in while logging");
      throw error;
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
