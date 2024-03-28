import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Message } from "./Message";

@Entity({ name: "rooms" })
export class Room {
  @PrimaryColumn()
  room_id!: string;

  @Column({ type: "int", array: true })
  members!: number[];

  @OneToMany(() => Message, (message) => message.room)
  messages!: Message[];
}
