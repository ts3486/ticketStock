import React from "react";
import TicketItem from "../../components/Ticket/TicketItem";
import { Box, Container } from "@mui/material";
import { Ticket } from "../../types/types";

const TicketList: React.FC<Ticket[]> = (tickets: Ticket[]) => {
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
          {tickets.map((ticket) => {
            return <TicketItem ticket={ticket} key={ticket.id} />;
          })}
        </Box>
      </Container>
      {/* page split */}
    </Box>
  );
};

export default TicketList;
