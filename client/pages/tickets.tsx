import React, { useState, useEffect } from "react";
import { client } from "../apollo";
import ticketStyles from "../styles/Ticket.module.css";
import TicketItem from "../components/Ticket/TicketItem";
import { GET_TICKETS } from "../gql/queries";

const TicketMarket: React.FC<any> = ({ _tickets }: any) => {
  //   const [array, setArray] = useState([]);

  useEffect(() => {}, [_tickets]);

  return (
    <div className={ticketStyles.listContainer}>
      <h1 className={ticketStyles.title}>TICKET MARKET</h1>
      <div className={ticketStyles.ticketsContainer}>
        {_tickets && _tickets.map((ticket: any) => <TicketItem ticket={ticket} key={ticket.id} />)}
      </div>
      page split
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
