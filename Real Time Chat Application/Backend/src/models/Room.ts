import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Message } from "./Message";

@Entity({ name: "rooms" })
export class Room {
  @PrimaryGeneratedColumn()
  room_id!: number;

  @Column({ type: "int", array: true })
  members!: number[];

  @OneToMany(() => Message, (message) => message.room)
  messages!: Message[];
}
