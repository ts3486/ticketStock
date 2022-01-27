import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
//Account
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput } from "../../entities/Ticket";
import { MyContext } from "../user/MyContext";
import { getRepository, getConnection } from "typeorm";
import { isAuth } from "../user/isAuth";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  allTickets() {
    return Ticket.find();
  }

  @Query(() => Ticket)
  getTicket(@Arg("id") id: number) {
    const ticket = Ticket.findOne(id.toString());

    if (!Ticket) {
      return "ticket does not exist";
    } else {
      return ticket;
    }
  }

  @Query(() => [Ticket])
  async getUtickets(@Arg("username") username: string) {
    const user = await User.findOne({ where: { username: username } });

    if (user != null) {
      const userId = user.id;
      const utickets = await Ticket.find({ where: { userId: userId } });

      if (!Ticket) {
        return "ticket does not exist";
      } else {
        return utickets;
      }
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendTicket(@Ctx() { payload }: MyContext, @Arg("id") id: number) {
    console.log(payload);

    await getConnection()
      .createQueryBuilder()
      .update(Ticket)
      .set({
        userId: parseInt(payload!.userId),
      })
      .where("id = :id", { id: id })
      .execute();

    return true;
  }
}
