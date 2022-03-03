import React, { useEffect } from "react";
import { client } from "../apollo";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/General/Header";
import EventList from "../components/Event/EventList";
import Filters from "../components/Event/Filters";
import TopPicks from "../components/Event/TopPicks";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Index: React.FC = ({ _events }: any) => {
  useEffect(() => {}, [_events]);

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
          <EventList _events={_events} />
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
