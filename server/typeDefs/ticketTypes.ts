import { gql } from "apollo-server-express";

export const ticketType = gql`
  type Ticket {
    id: String!
    name: String!
    image: String!
    price: Number!
    date: Date
  }

  type Query {
    allTickets: [Ticket]
    getEvent(id: Int): Ticket
  }
`;
