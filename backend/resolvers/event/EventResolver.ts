import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
//Account
import { Event, EventInput } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput } from "../../entities/Ticket";
import { MyContext } from "../auth/MyContext";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

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

  @Mutation(() => Boolean)
  async addEvent(
    @Ctx() context: MyContext,
    @Arg("name") name: string,
    @Arg("image") image: string,
    @Arg("desc") desc: string,
    @Arg("tickets") tickets: TicketInput
  ) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

      Event.create({ name, image, desc, tickets }).save();
      console.log("event added");

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async addTicket(@Ctx() context: MyContext, @Arg("tickets") tickets: TicketInput) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

      //call current ticket array, then push new ticket to array.
      const ticketArray = await getRepository(User)
        .createQueryBuilder("User")
        .select(["User.tickets"])
        .where("User.id = :id", { id: payload.userId })
        .getRawMany();

      const newTicketArray = ticketArray.concat(tickets);

      User.update(payload.userId, {
        tickets: newTicketArray,
      });

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

// const authorization = context.req.headers["authorization"];

// if (!authorization) {
//   return null;
// }

// try {
//   const token = authorization.split(" ")[1];
//   const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
//   return User.findOne(payload.userId);
// } catch (err) {
//   console.log(err);
//   return null;
// }
