import { User } from "../models/User";
import { AppDataSource } from "../config/dbConfig";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const signToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    logger.fatal("JWT_SECRET not defined in env variable");
    throw new Error("Internal Server Error");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const userService = {
  async createUser(userData: Partial<User>): Promise<User | undefined> {
    try {
      if (!userData.email || !userData.password) {
        throw new Error("Invalid email or password");
      }

      //hashing the password
      userData.password = await bcrypt.hash(userData.password, 12);

      const userRepository = AppDataSource.getRepository(User);
      const data = await userRepository.save(userData);
      return data;
    } catch (error) {
      logger.error(error, "something wrong in userService");
    }
  },

  async login(userData: Partial<User>): Promise<string | undefined> {
    try {
      const { email, password } = userData;
      if (!email || !password) {
        throw new Error("Please provide email and password");
      }

      //2) check if user exist and password is correct
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        email,
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Incorrect email or password");
      }

      // 3) if everything is ok send token to user
      const token = signToken(user.user_id);
      logger.info({ user: user.user_id }, "User logged in Successfully");

      return token;
    } catch (error) {
      logger.error(error, "something wrong in userService");
      throw error;
    }
  },

  async getUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    const data = await userRepository.find();
    return data;
  },

  async getUserById(id: string): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);
    const data = await userRepository.findOneBy({ user_id: id });
    return data;
  },

  async deleteUser(id: string): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new Error("User not found");
    }
    await userRepository.remove(user);
  },
};
