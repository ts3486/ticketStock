import React, { useEffect } from "react";
import { client } from "../apollo";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/General/Header";
import EventList from "../components/Event/EventList";
import Filters from "../components/Event/Filters";
import TopPicks from "../components/Event/TopPicks";

const Index: React.FC = ({ _events }: any) => {
  useEffect(() => {}, [_events]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Header />
      <Container>
        <Typography sx={{ width: "100%", textAlign: "left", fontSize: 30 }}>Events&Ticket</Typography>
        <Filters />
        <Box
          sx={{
            maxHeight: 500,
            overflow: "auto",
            flexWrap: "nowrap",
          }}>
          <EventList _events={_events} />
        </Box>

        <TopPicks />
      </Container>
    </Box>
  );
};

export default Index;

export const getStaticProps = async () => {
  const { error: eventError, data: eventData } = await client.query({
    query: ALL_EVENTS,
    errorPolicy: "all",
  });

  const events: Event[] = eventData.allEvents;

  return {
    props: {
      _events: events,
    },
  };
};
