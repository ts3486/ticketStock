import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation addEvent($name: String!, $image: String!, $desc: String!) {
    addEvent(name: $name, image: $image, desc: $desc)
  }
`;

export const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
