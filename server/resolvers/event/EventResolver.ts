import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
//Account
import { Event, EventInput } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput } from "../../entities/Ticket";
import { MyContext } from "../user/MyContext";
import { getRepository, getConnection } from "typeorm";
import { isAuth } from "../user/isAuth";

@Resolver()
export class EventResolver {
  @Query(() => Event)
  getEvent(@Arg("id") id: number) {
    const event = Event.findOne(id.toString());

    if (!Event) {
      return "event does not exist";
    } else {
      return event;
    }
  }

  @Query(() => [Event])
  allEvents() {
    return Event.find();
  }

  @Query(() => [Event])
  async getUevents(@Arg("username") username: string) {
    const user = await User.findOne({ where: { username: username } });

    if (user != null) {
      const userId = user.id;
      const uevents = await Event.find({ where: { userId: userId } });

      if (!Event) {
        return "event does not exist";
      } else {
        return uevents;
      }
    }
  }

  // async getUtickets(@Arg("username") username: string) {
  //   const user = await User.findOne({ where: { username: username } });

  //   if (user != null) {
  //     const userId = user.id;
  //     const utickets = await Ticket.find({ where: { userId: userId } });

  //     if (!Ticket) {
  //       return "ticket does not exist";
  //     } else {
  //       return utickets;
  //     }
  //   }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async addEvent(@Ctx() { payload }: MyContext, @Arg("event") event: EventInput, @Arg("ticket") ticket: TicketInput) {
    try {
      //add ticket to db
      const newTicket = await getRepository(Ticket).insert({
        name: ticket.name,
        cid: ticket.cid,
        price: ticket.price,
        userId: parseInt(payload!.userId),
      });

      //add event to db

      await getRepository(Event).insert({
        name: event.name,
        image: event.image,
        desc: event.desc,
        userId: parseInt(payload!.userId),
        ticketId: newTicket.identifiers[0].id,
      });

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
