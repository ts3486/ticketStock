import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne } from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./User";

@ObjectType()
@Entity("events")
export class Event extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column("text")
  image: string;

  @Field()
  @Column("text")
  desc: string;

  @Column(() => Date)
  @Field({ nullable: true })
  date: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @OneToOne(() => Ticket, (ticket) => ticket.event)
  @Field(() => Ticket)
  ticket: Ticket;
}

@InputType()
export class EventInput implements Partial<Event> {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  desc: string;

  @Column(() => Date)
  @Field({ nullable: true })
  date: Date;
}