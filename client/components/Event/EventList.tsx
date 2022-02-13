import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import EventCard from "./EventCard";
import Filters from "./Filters";
import indexStyles from "../../styles/Index.module.css";

interface Event {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const EventList: React.FC<any> = ({ _events }: any) => {
  useEffect(() => {}, [_events]);

  return (
    <div className={indexStyles.contentContainer}>
      <Typography sx={{ width: "100%", textAlign: "left", fontSize: 30 }}>Events&Ticket</Typography>

      <Filters />
      <div className={indexStyles.eventContainer}>
        {_events &&
          _events.map((event: Event) => (
            <EventCard
              event={{ id: event.id, name: event.name, image: event.image, description: event.desc }}
              key={event.id}
            />
          ))}
      </div>
    </div>
  );
};

export default EventList;
