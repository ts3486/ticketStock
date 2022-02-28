import React, { useState } from "react";
import { Container, CardMedia, Typography } from "@mui/material";

const ViewTicket: React.FC<any> = ({ ticket }: any) => {
  console.log(ticket.image);

  return (
    <Container sx={{ height: "100%" }}>
      <Typography>Ticket</Typography>
      <CardMedia
        sx={{ marginTop: "3%", marginBottom: "3%", height: 300 }}
        image={`https://gateway.pinata.cloud/ipfs/${ticket.cid}`}
        // image={"https://gateway.pinata.cloud/ipfs/QmcesxD5ttRexNCZ6i6ra9D8iXoqFbxiEmXuwN3NKJz29D"}
      />
      <Typography>Pricing</Typography>
      <Typography>Tickets Left</Typography>
    </Container>
  );
};

export default ViewTicket;

// https://gateway.pinata.cloud/ipfs/QmcesxD5ttRexNCZ6i6ra9D8iXoqFbxiEmXuwN3NKJz29D

//to connect pinata image to event, we need to add a CID property to the ticket entitiy.
