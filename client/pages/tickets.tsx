import React, { useEffect } from "react";
import { client } from "../apollo";
import TicketItem from "../components/Ticket/TicketItem";
import { Box, Container, Typography } from "@mui/material";
import { GET_TICKETS } from "../gql/queries";

const Tickets: React.FC<any> = ({ _tickets }: any) => {
  //   const [array, setArray] = useState([]);

  useEffect(() => {}, [_tickets]);

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography>TICKET MARKET</Typography>
        <Box>{_tickets && _tickets.map((ticket: any) => <TicketItem ticket={ticket} key={ticket.id} />)}</Box>
      </Box>
    </Container>
  );
};

export default Tickets;

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
