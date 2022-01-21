import React, { useState } from "react";
import { client } from "../apollo";
import ticketStyles from "../styles/Ticket.module.css";
import TicketItem from "../components/Ticket/TicketItem";
import { GET_TICKETS } from "../gql/queries";

const TicketMarket: React.FC<any> = ({ _tickets }: any) => {
  const [array, setArray] = useState([]);

  console.log(_tickets);
  return (
    <div className={ticketStyles.listContainer}>
      <h1>TICKET MARKET</h1>
      <div>
        {array.map((ticket: any) => {
          <TicketItem ticketData={ticket} />;
        })}
      </div>
    </div>
  );
};

export default TicketMarket;

export const getStaticProps = async () => {
  const { error: ticketError, data: ticketData } = await client.query({
    query: GET_TICKETS,
    errorPolicy: "all",
  });

  const tickets = ticketData.allTickets;

  return {
    props: {
      _tickets: tickets,
    },
  };
};
