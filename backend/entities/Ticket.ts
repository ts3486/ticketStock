import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./User";
import { Event } from "./Event";

@ObjectType()
@Entity("tickets")
export class Ticket extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  @Field()
  name: string;

  @Column("text")
  @Field()
  image: string;

  @Column(() => Date)
  @Field()
  date: Date;

  @OneToMany(() => User, (user) => user.tickets)
  @Field(() => User)
  user: User;

  @OneToMany(() => Event, (event) => event.tickets)
  @Field(() => Event)
  event: Event;
}

@InputType()
export class TicketInput implements Partial<Ticket> {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  date: Date;
}
