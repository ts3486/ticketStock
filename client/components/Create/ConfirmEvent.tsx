import React from "react";
import { Card, Button, Typography, CardMedia } from "@mui/material";

import { EventInput, TicketInput } from "../../types/types";

interface Props {
  event: EventInput;
  eventFile: File;
  ticket: TicketInput;
  ticketFile: File;

  completion: () => Boolean;
}

const ConfirmEvent: React.FC<Props> = (props) => {
  const completion = () => {
    props.completion();
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "10%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h4">Confirm Your Event</Typography>
      <CardMedia image="event.jpg" sx={{ height: 400, width: "90%", margin: "2%" }} />
      <Typography variant="h6" sx={{ marginBottom: "2%" }}>
        Event Details
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "2%" }}>
        Ticket Details
      </Typography>
      <Button variant="contained" onClick={() => completion()}>
        STEP 3: Create Event
      </Button>
    </Card>
  );
};

export default ConfirmEvent;
