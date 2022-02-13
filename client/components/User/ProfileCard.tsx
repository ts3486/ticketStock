import React, { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { ALL_EVENTS, GET_USER } from "../../gql/queries";
import { Card, Avatar } from "@mui/material";
import profileStyles from "../../styles/Profile.module.css";

// const { newContextComponents } = require("@drizzle/react-components");

// const { AccountData, ContractData, ContractForm } = newContextComponents;

const Profile = ({ drizzle, drizzleState, _user }: any) => {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(data);
  });

  if (!data) {
    return <div>no data. create an account?</div>;
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5%" }}>
      <Avatar sx={{ width: 100, height: 100 }} src="/profilePic.jpg" />

      {/* display username, email, events */}
      <h4>Email: {data.me.email}</h4>

      <h4>Tickets: </h4>

      {/* display possessed tickets.  */}

      {/* <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} /> */}
    </Card>
  );
};

export default Profile;
