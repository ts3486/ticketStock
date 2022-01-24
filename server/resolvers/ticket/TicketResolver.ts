import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
//Account
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput } from "../../entities/Ticket";
import { MyContext } from "../auth/MyContext";
import { getRepository, getConnection } from "typeorm";
import { isAuth } from "../auth/isAuth";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  allTickets() {
    return Ticket.find();
  }

  @Query(() => Event)
  getTicket(@Arg("id") id: number) {
    const ticket = Ticket.findOne(id.toString());

    if (!Ticket) {
      return "ticket does not exist";
    } else {
      return ticket;
    }
  }

  @Query(() => Event)
  getUticket(@Arg("username") username: string) {
    const ticket = Ticket.findOne(username);

    if (!Ticket) {
      return "ticket does not exist";
    } else {
      return ticket;
    }
  }
}
