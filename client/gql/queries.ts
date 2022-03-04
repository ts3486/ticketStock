import { gql } from "@apollo/client";

//USER
export const ALL_USERS = gql`
  {
    users {
      id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  {
    getUser(username: $username) {
      id
      username
      email
    }
  }
`;

//EVENTS
export const GET_EVENTS = gql`
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

//TICKETS
export const GET_TICKETS = gql`
  {
    allTickets {
      id
      name
      cid
      price
      date
    }
  }
`;

export const GET_TICKET = gql`
  {
    getTicket(id: $id) {
      id
      name
      cid
      price
      date
    }
  }
`;

export const GET_UTICKETS = gql`
  {
    getUTickets(username: $username) {
      id
      name
      cid
      price
      date
    }
  }
`;
