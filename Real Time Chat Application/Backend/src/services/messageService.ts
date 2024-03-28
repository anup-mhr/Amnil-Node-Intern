import { AppDataSource } from "../config/dbConfig";
import { Message } from "../models/Message";

export const messageService = {
  async createMessage(user_id: number, message: string): Promise<Message> {
    const messageRepository = AppDataSource.getRepository(Message);
    const data = await messageRepository.save({ user_id, message });
    return data;
  },

  async getMessageByRoom(room_id: string): Promise<Message[]> {
    const messageRepository = await AppDataSource.getRepository(Message)
      .createQueryBuilder("message")
      .where(`room_id='${room_id}'`)
      .getMany();
    return messageRepository;
  },
};
