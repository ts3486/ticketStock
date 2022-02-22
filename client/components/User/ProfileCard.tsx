import React, { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { ALL_EVENTS, GET_USER } from "../../gql/queries";
import { Card, Avatar } from "@mui/material";
import profileStyles from "../../styles/Profile.module.css";


const Profile = ({userData}: any) => {



  useEffect(() => {
  });

  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5%" }}>
      <Avatar sx={{ width: 100, height: 100 }} src="/profilePic.jpg" />

      {/* display username, email, events */}
      <h4>Email: {userData.email}</h4>

      <h4>Tickets: </h4>

      {/* display possessed tickets.  */}
    </Card>
  );
};

export default Profile;
