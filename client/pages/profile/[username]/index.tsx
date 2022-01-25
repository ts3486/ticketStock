import React, { useEffect } from "react";
import mypageStyles from "../../../styles/Mypage.module.css";
import { useMeQuery } from "../../../generated/graphql";
import { ALL_USERS, GET_UTICKETS } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";
import { Card, Avatar } from "@mui/material";
import ProfileCard from "../../../components/User/ProfileCard";
import TicketList from "../../../components/Ticket/TicketList";

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
    <div className={mypageStyles.pageContainer}>
      <div className={mypageStyles.container}>
        <ProfileCard drizzleData={AccountData} />
        <TicketList tickets={_utickets} />
      </div>
    </div>
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
