import { gql } from "@apollo/client";

export const ALL_EVENTS = gql`
  {
    allEvents {
      id
      name
      image
      desc
    }
  }
`;

export const GET_EVENT = gql`
  {
    getEvent(id: $id) {
      id
      title
      genre
      rating
    }
  }
`;

export const GET_TICKETS = gql`
  {
    allTickets {
      id
      name
      image
      price
      date
    }
  }
`;

export const GET_USER = gql`
  {
    me {
      email
    }
  }
`;

export const GET_UTICKETS = gql`
  {
    allTickets {
      id
      name
      image
      price
      date
    }
  }
`;
