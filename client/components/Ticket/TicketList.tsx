import React, { useState } from "react";
import { client } from "../../apollo";
import mypageStyles from "../../styles/Mypage.module.css";
import TicketItem from "../../components/Ticket/TicketItem";
import { GET_UTICKETS } from "../../gql/queries";

interface Ticket {
  id: number;
  name: string;
  image: string;
  price: number;
  date: Date;
}

const TicketList: React.FC<any> = ({ tickets }: any) => {
  const [array, setArray] = useState([]);

  return (
    <div className={mypageStyles.listContainer}>
      <h1>LIST</h1>
      <div className={mypageStyles.list}>
        {tickets.map((ticket: any) => {
          return <TicketItem ticket={ticket} key={ticket.id} />;
        })}
      </div>
      {/* page split */}
    </div>
  );
};

export default TicketList;
