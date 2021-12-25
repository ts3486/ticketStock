import { gql } from "apollo-server-express";

export const eventType = gql`
  type Event {
    id: String!
    name: String!
    image: String!
    desc: String!
  }

  type Query {
    getEvent(id: Int): Event
    allEvents: [Event]
  }

  type Mutation {
    addEvent(name: String!, image: String!, desc: String!): Boolean!
  }
`;
