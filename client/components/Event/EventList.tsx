import React, { useEffect } from "react";
import { Box } from "@mui/material";
import EventCard from "./EventItem";
import { Event } from "../../types/types";

interface Props {
  events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => {
  useEffect(() => {});

  return (
    <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {events && events.map((event: Event) => <EventCard event={event} key={event.id} />)}
    </Box>
  );
};

export default EventList;
