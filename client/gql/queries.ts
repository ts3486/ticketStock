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

export const GET_USER = gql`
  {
    me {
      email
    }
  }
`;

// export const GET_TICKETS = gql`
//   {
//     me {
//       email
//     }
//   }
// `;
