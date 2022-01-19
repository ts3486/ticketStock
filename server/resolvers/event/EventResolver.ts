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
      Event.create({ name, image, desc, ticket }).save();
      console.log("event added");

      //add ticket to db
      Ticket.create(ticket).save();
      console.log("ticket added");

      //add to user ticket list

      //1. get tickets array from User
      const ticketArray = await getRepository(User)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.tickets", "tickets")
        .where("users.id = :id", { id: payload!.userId })
        .getRawMany();

      const newTicketArray = ticketArray.concat(ticket);

      console.log(ticketArray, newTicketArray);

      //2. update User
      // await getConnection().getRepository(User).createQueryBuilder("users");
      // User.update(payload!.userId, {
      //   tickets: newTicketArray,
      // });

      console.log("user ticket info updated");

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
