import React, { useEffect } from "react";
import mypageStyles from "../../styles/Mypage.module.css";
import { useMeQuery } from "../../generated/graphql";
import { ALL_EVENTS, GET_USER } from "../../gql/queries";
import { Card, Avatar } from "@mui/material";

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
    <Card className={mypageStyles.card}>
      <Avatar className={mypageStyles.avatar} sx={{ width: 150, height: 150 }} src="profile_pic.jpg" />

      {/* display username, email, events */}
      <h4>Email: {data.me.email}</h4>

      <h4>Tickets: </h4>

      {/* display possessed tickets.  */}

      {/* <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} /> */}
    </Card>
  );
};

export default Profile;
