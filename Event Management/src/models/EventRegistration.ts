import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity({ name: "event_registration" })
export class EventRegistration {
  @PrimaryGeneratedColumn("uuid")
  register_id!: string;

  @Column()
  event_id!: string;

  @Column()
  user_id!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registration_date!: Date;

  @ManyToOne(() => Event, (event) => event.registrations)
  @JoinColumn({ name: "event_id" })
  event!: Event;

  @ManyToOne(() => User, (user) => user.registrations, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
