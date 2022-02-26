import React, { useState, useEffect } from "react";
import { useMeQuery } from "../../../generated/graphql";
import { ALL_USERS, GET_UTICKETS, GET_USER } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";
import { Container, Box } from "@mui/material";
import ProfileCard from "../../../components/User/ProfileCard";
import EventList from "../../../components/Event/EventList";
import TicketList from "../../../components/Ticket/TicketList";
import profileStyles from "../../../styles/Profile.module.css";

const Profile = ({ _user, _utickets, _uevents }: any) => {
  const [page, setPage] = useState(false);

  useEffect(() => {});

  if (!_user) {
    return <div>no data. create an account?</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
      <Container sx={{ display: "flex", alignItems: "center", margin: "10% auto 10% auto", width: "100%" }}>
        <ProfileCard userData={_user} />
        <Box sx={{ maxHeight: 500, overflow: "auto" }}>
          {page ? <EventList _events={_uevents} /> : <TicketList tickets={_utickets} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;

export const getStaticPaths = async () => {
  const { error, data } = await client.query({
    query: ALL_USERS,
    errorPolicy: "all",
  });

  const users = await data.users;

  const paths = users.map((user: any) => ({
    params: { username: user.username.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { error: userError, data: userData } = await client.query({
    query: gql` {
      getUser(username: "${params.username}"){
        id,
        username,
        email
      }
    }`,
    errorPolicy: "all",
  });

  const _user = userData.getUser;
  console.log(_user);

  const { error: ueventError, data: ueventData } = await client.query({
    query: gql` {
      getUevents(username: "${params.username}"){
        id,
        name,
        image,
        date
      }
    }`,
    errorPolicy: "all",
  });

  const _uevents = ueventData.getUevents;

  const { error: uticketError, data: uticketData } = await client.query({
    query: gql` {
      getUtickets(username: "${params.username}"){
        id,
        name,
        image,
        price,
        date
      }
    }`,
    errorPolicy: "all",
  });

  const _utickets = uticketData.getUtickets;

  return {
    props: {
      _user,
      _utickets,
      _uevents,
    },
  };
};
