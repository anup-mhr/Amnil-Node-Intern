import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EventRegistration } from "./EventRegistration";

@Entity({ name: "events" })
export class Event {
  @PrimaryGeneratedColumn("uuid")
  event_id!: string;

  @Column({ nullable: false })
  title!: string;

  @Column("text")
  description!: string;

  @Column({ nullable: true })
  thumbnail!: string;

  @Column({ default: 10 })
  seats!: number;

  @Column("real")
  price!: number;

  @Column({ type: "timestamp" })
  event_date!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.event)
  registrations!: EventRegistration[];
}
