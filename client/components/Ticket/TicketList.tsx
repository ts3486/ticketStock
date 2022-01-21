import React, { useState } from "react";
import mypageStyles from "../../styles/Mypage.module.css";
import TicketItem from "../../components/Ticket/TicketItem";

const TicketList: React.FC<any> = ({}) => {
  const [array, setArray] = useState([]);

  return (
    <div className={mypageStyles.listContainer}>
      <h1>LIST</h1>
      <div>
        {array.map((ticket: any) => {
          <TicketItem ticketData={ticket} />;
        })}
      </div>
    </div>
  );
};

export default TicketList;
