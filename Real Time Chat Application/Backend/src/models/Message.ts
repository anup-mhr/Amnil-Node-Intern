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
  sender!: number;

  @Column({ type: "text", nullable: false })
  message!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Room, (room) => room.messages, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "room_id" })
  room!: Room;

  @OneToOne(() => User, (user) => user.message, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "sender" })
  user!: User;
}
