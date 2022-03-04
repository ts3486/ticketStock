import React, { useEffect, useState } from "react";
import { client } from "../apollo";
import EventList from "../components/Event/EventList";
import TicketList from "../components/Ticket/TicketList";
import { Box, Container, Typography } from "@mui/material";
import { GET_EVENTS, GET_TICKETS } from "../gql/queries";

const Explore: React.FC<any> = ({ _events, _tickets }: any) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {}, [_tickets]);

  return (
    <Container sx={{ margin: "10%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography sx={{ textAlign: "center" }} variant="h2">
          Explore
        </Typography>

        {display ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "3%",
            }}>
            <EventList events={_events} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "3%",
            }}>
            <TicketList tickets={_tickets} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Explore;

export const getStaticProps = async () => {
  const { error: eventError, data: eventData } = await client.query({
    query: GET_EVENTS,
    errorPolicy: "all",
  });

  const events: Event[] = eventData.allEvents;
  const { error: ticketError, data: ticketData } = await client.query({
    query: GET_TICKETS,
    errorPolicy: "all",
  });

  const tickets = ticketData.allTickets;

  return {
    props: {
      _events: events,
      _tickets: tickets,
    },
  };
};
