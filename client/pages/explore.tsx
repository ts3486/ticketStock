import React, { useEffect, useState } from "react";
import { client } from "../apollo";
import VerticalEventList from "../components/Event/VerticalEventList";
import TicketList from "../components/Ticket/TicketList";
import Filter from "../components/Event/Filters";
import { Button, Box, Container, Typography, TextField } from "@mui/material";
import { GET_EVENTS, GET_TICKETS } from "../gql/queries";

const Explore: React.FC<any> = ({ _events, _tickets }: any) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {}, [_tickets]);

  return (
    <Container sx={{ margin: "10%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography sx={{ textAlign: "center", marginBottom: "4%" }} variant="h2">
          Explore
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginBottom: "4%",
          }}>
          <TextField
            sx={{ height: 50, marginBottom: "1%", marginRight: "5%", width: "40%" }}
            id="filled-basic"
            label="Filled"
            variant="filled"
          />
          {/* <Button
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
          </Button> */}

          <Filter />
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

export const getStaticProps = async () => {
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
