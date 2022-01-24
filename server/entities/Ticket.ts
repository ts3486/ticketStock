import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, InputType, Field, Int } from "type-graphql";
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

  // @Column({ type: "longblob" })
  // @Field()
  // file: string;

  @Column({ type: "int" })
  @Field(() => Int)
  price: number;

  @Column(() => Date)
  @Field({ nullable: true })
  date: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn()
  // @Field(() => User)
  user: User;
  userId: number;

  @OneToOne(() => Event, (event) => event.ticket)
  // @Field(() => Event)
  event: Event;
}

@InputType()
export class TicketInput implements Partial<Ticket> {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field(() => Int)
  price: number;

  @Field({ nullable: true })
  date: Date;
}
