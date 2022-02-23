import React, { useEffect } from "react";
import mypageStyles from "../styles/Mypage.module.css";
import { useMeQuery } from "../generated/graphql";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import { Card, Avatar } from "@mui/material";
import ProfileCard from "../components/User/ProfileCard";
import TicketList from "../components/Ticket/TicketList";

const Profile = () => {
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
    <div className={mypageStyles.pageContainer}>
      <div className={mypageStyles.container}>
        <ProfileCard userData={data} />
        <TicketList />
      </div>
    </div>
  );
};

export default Profile;
