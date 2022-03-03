import React, { useEffect } from "react";
import { Box } from "@mui/material";
import EventCard from "./EventItem";
import { Event } from "../../types/types";

const EventList: React.FC<Event[]> = (_events: Event[]) => {
  useEffect(() => {});

  return (
    <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {_events && _events.map((event) => <EventCard event={event} />)}
    </Box>
  );
};

export default EventList;
