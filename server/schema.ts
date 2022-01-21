import { makeExecutableSchema } from "apollo-server-express";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "graphql-tools";
//types
import { userType } from "./typeDefs/userTypes";
import { eventType } from "./typeDefs/eventTypes";
import { ticketType } from "./typeDefs/ticketTypes";
//resolvers
import { UserResolver } from "./resolvers/auth/UserRevolver";
import { EventResolver } from "./resolvers/event/EventResolver";
import { TicketResolver } from "./resolvers/ticket/TicketResolver";

const typeDefs = mergeTypeDefs([userType, eventType, ticketType]);
const resolvers = mergeResolvers([UserResolver, EventResolver, TicketResolver]);

export const Schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers as IResolvers, //set to IResolver so it matches resolvers type
});
