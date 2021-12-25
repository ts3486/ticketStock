import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Scalars['String'];
  desc: Scalars['String'];
  tickets: Ticket;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
  authRedirect: Scalars['Boolean'];
  addEvent: Scalars['Boolean'];
  addTicket: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddEventArgs = {
  tickets: TicketInput;
  desc: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddTicketArgs = {
  tickets: TicketInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
  getEvent: Event;
  allEvents: Array<Event>;
};


export type QueryGetEventArgs = {
  id: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Scalars['String'];
  date: Scalars['DateTime'];
  user: User;
  event: Event;
};

export type TicketInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  date: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  tickets: Array<Ticket>;
};

export type AddEventMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  desc: Scalars['String'];
  tickets: TicketInput;
}>;


export type AddEventMutation = { __typename?: 'Mutation', addEvent: boolean };

export type AddTicketMutationVariables = Exact<{
  ticket: TicketInput;
}>;


export type AddTicketMutation = { __typename?: 'Mutation', addTicket: boolean };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', allEvents: Array<{ __typename?: 'Event', id: number, name: string, image: string, desc: string }> };

export type AuthRedirectMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthRedirectMutation = { __typename?: 'Mutation', authRedirect: boolean };

export type GetEventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', id: number, name: string, image: string, desc: string } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, email: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string } | null | undefined };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };


export const AddEventDocument = gql`
    mutation AddEvent($name: String!, $image: String!, $desc: String!, $tickets: TicketInput!) {
  addEvent(name: $name, image: $image, desc: $desc, tickets: $tickets)
}
    `;
export type AddEventMutationFn = Apollo.MutationFunction<AddEventMutation, AddEventMutationVariables>;

/**
 * __useAddEventMutation__
 *
 * To run a mutation, you first call `useAddEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventMutation, { data, loading, error }] = useAddEventMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      desc: // value for 'desc'
 *      tickets: // value for 'tickets'
 *   },
 * });
 */
export function useAddEventMutation(baseOptions?: Apollo.MutationHookOptions<AddEventMutation, AddEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, options);
      }
export type AddEventMutationHookResult = ReturnType<typeof useAddEventMutation>;
export type AddEventMutationResult = Apollo.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = Apollo.BaseMutationOptions<AddEventMutation, AddEventMutationVariables>;
export const AddTicketDocument = gql`
    mutation AddTicket($ticket: TicketInput!) {
  addTicket(tickets: $ticket)
}
    `;
export type AddTicketMutationFn = Apollo.MutationFunction<AddTicketMutation, AddTicketMutationVariables>;

/**
 * __useAddTicketMutation__
 *
 * To run a mutation, you first call `useAddTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketMutation, { data, loading, error }] = useAddTicketMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useAddTicketMutation(baseOptions?: Apollo.MutationHookOptions<AddTicketMutation, AddTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTicketMutation, AddTicketMutationVariables>(AddTicketDocument, options);
      }
export type AddTicketMutationHookResult = ReturnType<typeof useAddTicketMutation>;
export type AddTicketMutationResult = Apollo.MutationResult<AddTicketMutation>;
export type AddTicketMutationOptions = Apollo.BaseMutationOptions<AddTicketMutation, AddTicketMutationVariables>;
export const AllEventsDocument = gql`
    query AllEvents {
  allEvents {
    id
    name
    image
    desc
  }
}
    `;

/**
 * __useAllEventsQuery__
 *
 * To run a query within a React component, call `useAllEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllEventsQuery(baseOptions?: Apollo.QueryHookOptions<AllEventsQuery, AllEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllEventsQuery, AllEventsQueryVariables>(AllEventsDocument, options);
      }
export function useAllEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllEventsQuery, AllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllEventsQuery, AllEventsQueryVariables>(AllEventsDocument, options);
        }
export type AllEventsQueryHookResult = ReturnType<typeof useAllEventsQuery>;
export type AllEventsLazyQueryHookResult = ReturnType<typeof useAllEventsLazyQuery>;
export type AllEventsQueryResult = Apollo.QueryResult<AllEventsQuery, AllEventsQueryVariables>;
export const AuthRedirectDocument = gql`
    mutation authRedirect {
  authRedirect
}
    `;
export type AuthRedirectMutationFn = Apollo.MutationFunction<AuthRedirectMutation, AuthRedirectMutationVariables>;

/**
 * __useAuthRedirectMutation__
 *
 * To run a mutation, you first call `useAuthRedirectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRedirectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRedirectMutation, { data, loading, error }] = useAuthRedirectMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthRedirectMutation(baseOptions?: Apollo.MutationHookOptions<AuthRedirectMutation, AuthRedirectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthRedirectMutation, AuthRedirectMutationVariables>(AuthRedirectDocument, options);
      }
export type AuthRedirectMutationHookResult = ReturnType<typeof useAuthRedirectMutation>;
export type AuthRedirectMutationResult = Apollo.MutationResult<AuthRedirectMutation>;
export type AuthRedirectMutationOptions = Apollo.BaseMutationOptions<AuthRedirectMutation, AuthRedirectMutationVariables>;
export const GetEventDocument = gql`
    query GetEvent($id: String!) {
  getEvent(id: $id) {
    id
    name
    image
    desc
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;