import React, { useState } from "react";
import { client } from "../../apollo";
import TicketItem from "../../components/Ticket/TicketItem";
import { GET_UTICKETS } from "../../gql/queries";
import { Box, Card, Container, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        marginLeft: "2%",
        padding: "2%",
      }}>
      <Container sx={{ marginTop: "2%" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {tickets.map((ticket: any) => {
            return <TicketItem ticket={ticket} key={ticket.id} />;
          })}
        </Box>
      </Container>
      {/* page split */}
    </Box>
  );
};

export default TicketList;
