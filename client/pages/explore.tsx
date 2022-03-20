import React, { useEffect, useState } from "react";
import { client } from "../apollo";
import VerticalEventList from "../components/Event/VerticalEventList";
import TicketList from "../components/Ticket/TicketList";
import Filter from "../components/Event/Filters";
import { Button, Box, Container, Typography, TextField } from "@mui/material";
import { GET_EVENTS, GET_TICKETS } from "../gql/queries";
import { KeyboardArrowRightRounded } from "@material-ui/icons";

const Explore: React.FC<any> = ({ _events, _tickets }: any) => {
  const [display, setDisplay] = useState(false);

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
          <Button onClick={() => (window.location.href = "/tickets")}>Want to see tickets only? </Button>
        </Box>

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

export const getServerSideProps = async ({ query }: any) => {
  const { error: eventError, data: eventData } = await client.query({
    query: GET_EVENTS,
    errorPolicy: "all",
  });

  const events: Event[] = eventData.getEvents;

  const { error: ticketError, data: ticketData } = await client.query({
    query: GET_TICKETS,
    errorPolicy: "all",
  });

  const tickets = ticketData.getTickets;

  return {
    props: {
      _events: events,
      _tickets: tickets,
    },
  };
};
