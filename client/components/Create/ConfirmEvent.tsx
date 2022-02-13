import React, { useState } from "react";
import { Box, Card, Button, Input, Typography, CardMedia } from "@mui/material";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import formStyles from "../../styles/Create.module.css";

interface EventInput {
  name: string;
  image: string;
  desc: string;
  date: Date;
}

interface TicketInput {
  name: string;
  image: string;
  price: number;
  date: Date;
}

interface Props {
  event: EventInput;
  eventFile: File;
  ticket: TicketInput;
  ticketFile: File;
}

const ConfirmEvent: React.FC<Props> = (props) => {
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
      <Button variant="contained">STEP 3: Confirm Event</Button>
    </Card>
  );
};

export default ConfirmEvent;
