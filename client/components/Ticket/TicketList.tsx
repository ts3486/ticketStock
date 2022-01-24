import React, { useState } from "react";
import { client } from "../../apollo";
import mypageStyles from "../../styles/Mypage.module.css";
import TicketItem from "../../components/Ticket/TicketItem";
import { GET_UTICKETS } from "../../gql/queries";

const TicketList: React.FC<any> = () => {
  const [array, setArray] = useState([]);

  return (
    <div className={mypageStyles.listContainer}>
      <h1>LIST</h1>
      <div>
        {array.map((ticket: any) => {
          <TicketItem ticket={ticket} />;
        })}
      </div>
      {/* page split */}
    </div>
  );
};

export default TicketList;
