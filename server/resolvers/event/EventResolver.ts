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
  getEvent(@Arg("id") id: string) {
    const event = Event.findOne(id);

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

  //   @Mutation(() => Boolean, { nullable: true })
  //   @UseMiddleware(isAuth)
  //   async addTicket(@Ctx() { payload }: MyContext, @Arg("ticket") ticket: TicketInput) {
  //     try {
  //       const name = ticket.name;
  //       const image = ticket.image;
  //       const price = ticket.price;
  //       // const date = ticket.date;

  //       //add ticket to db
  //       Ticket.create({ name, image, price }).save();

  //       console.log(payload!.userId);

  //       // add ticket to user data
  //       // call current ticket array, then push new ticket to array.
  //       const ticketArray = await getRepository(User)
  //         .createQueryBuilder("user")
  //         .where("User.id = :id", { id: payload!.userId })
  //         .select(["User.tickets"])
  //         .getRawMany();

  //       const newTicketArray = ticketArray.concat(ticket);

  //       User.update(payload!.userId, {
  //         tickets: newTicketArray,
  //       });

  //       console.log("ticket added");

  //       return true;
  //     } catch (err) {
  //       console.log(err);
  //       return null;
  //     }
  //   }
}