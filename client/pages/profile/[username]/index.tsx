import React, { useEffect } from "react";
import { useMeQuery } from "../../../generated/graphql";
import { ALL_USERS, GET_UTICKETS } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";
import { Container, Box } from "@mui/material";
import ProfileCard from "../../../components/User/ProfileCard";
import TicketList from "../../../components/Ticket/TicketList";
import profileStyles from "../../../styles/Profile.module.css";

const { newContextComponents } = require("@drizzle/react-components");

const { AccountData, ContractData, ContractForm } = newContextComponents;

const Profile = ({ drizzle, drizzleState, _utickets }: any) => {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(_utickets);
  });

  if (!data) {
    return <div>no data. create an account?</div>;
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%"}}>
    <Container sx={{ display: "flex", alignItems: "center", margin: "10% auto 10% auto", width: "100%" }}>
      <ProfileCard drizzleData={AccountData} />
      <TicketList tickets={_utickets} />
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
      _utickets,
    },
  };
};
