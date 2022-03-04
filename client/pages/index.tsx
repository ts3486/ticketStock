import React, { useEffect } from "react";
import { client } from "../apollo";
import { ALL_EVENTS } from "../gql/queries";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/General/Header";
import EventList from "../components/Event/EventList";
import Filters from "../components/Event/Filters";
import TopPicks from "../components/Event/TopPicks";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Event } from "../types/types";

interface Props {
  _events: Event[];
}

const Index: React.FC<Props> = ({ _events }) => {
  useEffect(() => {});

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "10%" }}>
      <Header />
      <Container>
        <Typography sx={{ width: "100%", textAlign: "left", fontSize: 30 }}>Events&Ticket</Typography>
        <Filters />
        <Box
          sx={{
            maxHeight: 500,
            overflow: "auto",
            flexWrap: "nowrap",
            display: "flex",
            justifyContent: "center",
          }}>
          <EventList events={_events} />
        </Box>

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 100,
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            display: "flex",
            alignItems: "center",
          }}>
          Top Picks <LocalFireDepartmentIcon sx={{ fontSize: 40, marginLeft: 1 }} />
        </Typography>
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
