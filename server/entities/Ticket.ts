import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Readable } from "stream";
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
  cid: string;

  @Column()
  @Field()
  tokenId: number;

  // @Column({ type: "longblob" })
  // @Field()
  // file: string;

  @Column({ type: "int" })
  @Field(() => Int)
  price: number;

  @Column(() => Date)
  @Field({ nullable: true })
  date: Date;

  // @Column({ type: "int" })
  // @Field(() => Int)
  // eventId: number;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn()
  user: User;

  @Column({ type: "int" })
  @Field(() => Int)
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
  cid: string;

  @Field()
  tokenId: number;

  @Field(() => Int)
  price: number;

  @Field()
  date: Date;
}

@InputType()
export class FileInput {
  @Field()
  stream: Readable;
  @Field()
  filename: string;
  @Field()
  mimetype: string;
  @Field()
  encoding: string;
}
