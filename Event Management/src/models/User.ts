import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EventRegistration } from "./EventRegistration";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: "user" })
  role!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.user)
  registrations!: EventRegistration[];
}
