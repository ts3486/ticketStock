import React, { useEffect } from "react";
import mypageStyles from "../styles/Mypage.module.css";
import { useMeQuery } from "../generated/graphql";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import { Card, Avatar } from "@mui/material";
import ProfileCard from "../components/User/ProfileCard";
import TicketList from "../components/Ticket/TicketList";

const { newContextComponents } = require("@drizzle/react-components");

const { AccountData, ContractData, ContractForm } = newContextComponents;

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
    <div className={mypageStyles.pageContainer}>
      <div className={mypageStyles.container}>
        <ProfileCard drizzleData={AccountData} />
        <TicketList />
      </div>
    </div>
  );
};

export default Profile;

// export const getStaticProps = async () => {
// const { error: userError, data: userData } = await client.query({
//   query: GET_USER,
//   errorPolicy: "all",
// });
// const { error: eventError, data: eventData } = await client.query({
//   query: ALL_EVENTS,
//   fetchPolicy: "network-only",
//   errorPolicy: "all",
// });
// return {
//   props: {
//     // _user: userData,
//     _events: eventData.allEvents,
//   },
// };
// };
