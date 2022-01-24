import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
//Account
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput } from "../../entities/Ticket";
import { MyContext } from "../auth/MyContext";
import { getRepository, getConnection } from "typeorm";
import { isAuth } from "../auth/isAuth";

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

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async addEvent(
    @Ctx() { payload }: MyContext,
    @Arg("name") name: string,
    @Arg("image") image: string,
    @Arg("desc") desc: string,
    @Arg("ticket") ticket: TicketInput
  ) {
    try {
      //add event to db
      // const newEvent = await Event.create({ name, image, desc, ticket }).save();
      const newEvent = new Event();
      newEvent.name = name;
      newEvent.image = image;
      newEvent.desc = desc;
      newEvent.userId = parseInt(payload!.userId);
      newEvent.save();
      console.log("event added");

      //add ticket to db
      // const newTicket = await Ticket.create(ticket).save();
      const newTicket = new Ticket();
      newTicket.name = ticket.name;
      newTicket.image = ticket.image;
      newTicket.price = ticket.price;
      newTicket.userId = parseInt(payload!.userId);
      console.log(newTicket);
      newTicket.save();

      console.log("ticket added");

      //add to user ticket list
      // 1. get tickets array from User
      // const user = await getRepository(User)
      //   .createQueryBuilder("users")
      //   .leftJoinAndSelect("users.tickets", "ticket")
      //   .where("users.id = :id", { id: payload!.userId })
      //   .getOne();

      // if (user != null) {
      //   const updatedTickets: Ticket[] = user.tickets.concat(newTicket);

      //   console.log(updatedTickets);

      // 2. update User
      // await getRepository(User)
      //   .createQueryBuilder("users")
      //   .leftJoinAndSelect("users.tickets", "ticket")
      //   .update(User)
      //   .set({ tickets: updatedTickets })
      //   .where("users.id = :id", { id: payload!.userId })
      //   .execute();
      // } else {
      //   console.log("user null error");
      // }

      // console.log("user ticket info updated");

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
