import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, InputType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
//Account
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { Ticket, TicketInput, FileInput } from "../../entities/Ticket";
import { Readable } from "stream";
import { MyContext } from "../user/MyContext";
import { getRepository, getConnection } from "typeorm";
import { isAuth } from "../user/isAuth";
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const pinataHash = process.env.PINATA_HASH;

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  getTickets() {
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

  //   @Mutation(() => Boolean)
  //   async pinFile(@Arg("file", (type) => GraphQLUpload) file: FileInput, @Arg("ticket") ticket: TicketInput) {
  //     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  //     //we gather a local file for this example, but any valid readStream source will work here.
  //     let data = new FormData();
  //     data.append("file", JSON.stringify(file), { filepath: "tickets" });

  //     //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //     //metadata is optional
  //     const metadata = JSON.stringify({
  //       name: ticket.name,
  //       keyvalues: {
  //         price: ticket.price,
  //       },
  //     });

  //     data.append("pinataMetadata", metadata);

  //     return axios
  //       .post(url, data, {
  //         maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
  //         headers: {
  //           "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //           pinata_api_key: pinataApiKey,
  //           pinata_secret_api_key: pinataSecretApiKey,
  //           // authorization: `Bearer ${pinataHash}`,
  //           path: "tickets",
  //         },
  //       })
  //       .then(function (response: any) {
  //         console.log(response);
  //         console.log("ticket file pinned");
  //         return true;
  //       })
  //       .catch(function (error: any) {
  //         console.log(error);
  //         console.log("ticket file pin failed");
  //         return false;
  //       });
  //   }
}
