import React, { useEffect } from "react";
import mypageStyles from "../styles/Home.module.css";
import { client } from "./_app";
import { ALL_EVENTS, GET_USER } from "../gql/queries";

// const { AccountData, ContractData, ContractForm } = newContextComponents;

const Profile = ({ drizzle, drizzleState, _user }: any) => {
  return (
    <div className={mypageStyles.home}>
      <div>
        <h2>User</h2>

        {/* display username, email, events */}
        {/* {_user.email} */}

        <h2>Tickets</h2>

        {/* display possessed tickets.  */}

        {/* <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} /> */}
      </div>
    </div>
  );
};

export default Profile;

export const getStaticProps = async () => {
  // const { error: userError, data: userData } = await client.query({
  //   query: GET_USER,
  //   errorPolicy: "all",
  // });

  const { error: eventError, data: eventData } = await client.query({
    query: ALL_EVENTS,
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  return {
    props: {
      // _user: userData,
      _events: eventData.allEvents,
    },
  };
};
