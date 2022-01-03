import React from "react";
// import { newContextComponents } from "@drizzle/react-components";
import mypageStyles from "../styles/Home.module.css";

// const { AccountData, ContractData, ContractForm } = newContextComponents;

const Mypage = ({ drizzle, drizzleState }: any) => {
  return (
    <div className={mypageStyles.home}>
      <div>
        <h2>User</h2>

        {/* display username, email, events */}

        <h2>Tickets</h2>

        {/* display possessed tickets.  */}

        {/* <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} /> */}
      </div>
    </div>
  );
};

export default Mypage;
