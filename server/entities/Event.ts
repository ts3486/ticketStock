import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Ticket } from "./Ticket";

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

  @ManyToOne(() => Ticket, (ticket) => ticket.event)
  @Field(() => Ticket)
  ticket: Ticket;

  // @Field()
  // @ManyToOne
  // user: User;
}

@InputType()
export class EventInput implements Partial<Event> {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  desc: string;
}
