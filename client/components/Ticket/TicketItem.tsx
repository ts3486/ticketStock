import React from "react";
import { Card, CardMedia, Typography, Container } from "@mui/material";
import ticketStyles from "../../styles/Ticket.module.css";

const TicketItem: React.FC<any> = ({ ticket }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 1,
        padding: 3,
      }}>
      <CardMedia sx={{ height: 100, width: 160, borderRadius: 3 }} image="/ticket.jpeg" />

      <Typography> Name & Date</Typography>
    </Card>
  );
};

export default TicketItem;
