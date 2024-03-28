import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  message_id!: number;

  @Column({ nullable: false })
  room_id!: string;

  @Column({ nullable: false })
  sender!: string;

  @Column({ type: "text", nullable: false })
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: "room_id" })
  room!: Room;

  @OneToOne(() => User, (user) => user.message)
  @JoinColumn({ name: "sender" })
  user!: User;
}
