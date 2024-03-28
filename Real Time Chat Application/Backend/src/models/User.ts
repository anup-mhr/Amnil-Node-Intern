import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Message } from "./Message";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @OneToOne(() => Message, (message) => message.user)
  message!: Message;
}
