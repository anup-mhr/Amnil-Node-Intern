import { Room } from "../models/Room";
import { AppDataSource } from "../config/dbConfig";
import AppError from "../utils/AppError";

export const roomService = {
  async createRoom(roomData: Partial<Room>) {
    if (!roomData.room_id || !roomData.members) {
      throw new AppError("insufficient Info", 400);
    }
    const roomRepository = AppDataSource.getRepository(Room);
    await roomRepository.save(roomData);
  },

  async getRoomById(room_id: string): Promise<Room> {
    const roomRepository = AppDataSource.getRepository(Room);
    const data = await roomRepository.findOneBy({ room_id });
    if (!data) throw new AppError("room not found", 404);
    return data;
  },

  async removeRoom(room_id: string): Promise<void> {
    const roomRepository = AppDataSource.getRepository(Room);
    const roomData = await roomRepository.findOneBy({ room_id });
    if (!roomData) throw new AppError("room not found", 404);
    await roomRepository.remove(roomData);
  },
};
