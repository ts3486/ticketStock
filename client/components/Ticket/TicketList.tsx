import React, { useState } from "react";
import { client } from "../../apollo";
import TicketItem from "../../components/Ticket/TicketItem";
import { GET_UTICKETS } from "../../gql/queries";
import { Card, Container, Typography } from "@mui/material";
import profileStyles from "../../styles/Profile.module.css";

interface Ticket {
  id: number;
  name: string;
  image: string;
  price: number;
  date: Date;
}

const TicketList: React.FC<any> = ({ tickets }: any) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        marginLeft: "2%",
        padding: "5%",
      }}>
      <Typography variant="h3" align="center">
        List
      </Typography>
      <Container sx={{ display: "flex", flexWrap: "wrap" }}>
        {tickets.map((ticket: any) => {
          return <TicketItem ticket={ticket} key={ticket.id} />;
        })}
      </Container>
      {/* page split */}
    </Card>
  );
};

export default TicketList;
