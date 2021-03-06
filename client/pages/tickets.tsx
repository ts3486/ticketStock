import React, { useEffect } from "react";
import { client } from "../apollo";
import TicketItem from "../components/Ticket/TicketItem";
import { Button, Box, Container } from "@mui/material";
import { GET_TICKETS } from "../gql/queries";
import Filter from "../components/Event/Filters";

const Tickets: React.FC<any> = ({ _tickets }: any) => {
  //   const [array, setArray] = useState([]);

  useEffect(() => {}, [_tickets]);

  return (
    <Container sx={{ margin: "10%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginBottom: "1%",
          }}>
          <Filter />
          <Button onClick={() => (window.location.href = "/explore")}>Want to see tickets only? </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "3%",
          }}>
          {_tickets && _tickets.map((ticket: any) => <TicketItem ticket={ticket} key={ticket.id} />)}
        </Box>
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

  const tickets = ticketData.getTickets;

  return {
    props: {
      _tickets: tickets,
    },
  };
};
