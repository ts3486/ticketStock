import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
//Account
import { Event } from "../../entities/Event";
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
      //add ticket to db
      const newTicket = await getRepository(Ticket).insert({
        name: ticket.name,
        image: ticket.image,
        price: ticket.price,
        userId: parseInt(payload!.userId),
      });

      //add event to db

      await getRepository(Event).insert({
        name: name,
        image: image,
        desc: desc,
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
