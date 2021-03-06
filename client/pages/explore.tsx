import React, { useEffect, useState } from "react";
import { client } from "../apollo";
import VerticalEventList from "../components/Event/VerticalEventList";
import TicketList from "../components/Ticket/TicketList";
import Filter from "../components/Event/Filters";
import Maps from "../components/externalAPI/googleMaps/maps";
import { Button, Box, Container } from "@mui/material";
import { GET_EVENTS, GET_TICKETS } from "../gql/queries";

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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ width: "55%" }}>
            <VerticalEventList events={_events} />
          </Box>
          <Box sx={{ height: 700, width: "40%" }}>
            <Maps />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Explore;

export const getServerSideProps = async (context: any) => {
  const keyword = context.query.keyword;
  const location = context.query.location;

  console.log(keyword, location);

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
