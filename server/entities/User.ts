import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Ticket } from "./Ticket";
import { Event } from "./Event";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  email: string;

  @Field()
  @Column("text")
  username: string;

  @Field()
  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Event, (event) => event.user)
  // @Field(() => [Event])
  @JoinColumn()
  events: Event[];

  @OneToMany(() => Ticket, (ticket) => ticket.user, { eager: true })
  // @Field(() => [Ticket])
  @JoinColumn()
  tickets: Ticket[];
}
