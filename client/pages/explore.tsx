import React, { useEffect, useState } from "react";
import { client } from "../apollo";
import VerticalEventList from "../components/Event/VerticalEventList";
import TicketList from "../components/Ticket/TicketList";
import { Button, Box, Container, Typography } from "@mui/material";
import { GET_EVENTS, GET_TICKETS } from "../gql/queries";

const Explore: React.FC<any> = ({ _events, _tickets }: any) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {}, [_tickets]);

  return (
    <Container sx={{ margin: "10%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography sx={{ textAlign: "center", marginBottom: "3%" }} variant="h2">
          Explore
        </Typography>

        <Button
          variant="contained"
          sx={{ width: "10%", justifyContent: "center" }}
          onClick={() => {
            if (display == false) {
              setDisplay(true);
            }
            if (display == true) {
              setDisplay(false);
            }
          }}>
          {display ? "Events" : "Tickets"}
        </Button>

        {display ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              maxHeight: 1020,
              overflow: "hidden",
            }}>
            <TicketList tickets={_tickets} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: 1020,
              overflow: "hidden",
            }}>
            <VerticalEventList events={_events} />
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
