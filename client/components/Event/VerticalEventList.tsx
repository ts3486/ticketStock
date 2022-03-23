import React, { useEffect } from "react";
import { Box } from "@mui/material";
import VerticalEventCard from "./VerticalEventItem";
import { Event } from "../../types/types";

interface Props {
  events: Event[];
}

const VerticalEventList: React.FC<Props> = ({ events }) => {
  useEffect(() => {});

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxHeight: 1020,
        overflow: "hidden",
        width: "100%",
      }}>
      {events && events.map((event: Event) => <VerticalEventCard event={event} key={event.id} />)}
    </Box>
  );
};

export default VerticalEventList;
