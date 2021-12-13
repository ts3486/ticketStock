import { makeExecutableSchema } from "apollo-server-express";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "graphql-tools";
//types
import { authType } from "./typeDefs/authTypes";
import { eventType } from "./typeDefs/eventTypes";
//resolvers
import { authResolver } from "./resolvers/auth/authResolver";
import { EventResolver } from "./resolvers/event/EventResolver";

const typeDefs = mergeTypeDefs([eventType]);
const resolvers = mergeResolvers([authResolver, EventResolver]);

export const Schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers as IResolvers, //set to IResolver so it matches resolvers type
});
