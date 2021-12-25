import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  // @OneToMany(() => Event, (event) => event.user)
  // events: [Event];

  @Field(() => [Ticket])
  @ManyToOne(() => Ticket, (ticket) => ticket.user)
  tickets: [Ticket];
}
