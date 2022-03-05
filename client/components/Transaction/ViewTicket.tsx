import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";

const ViewTicket: React.FC<any> = ({ ticket }: any) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>Ticket</Typography>
      <CardMedia
        sx={{ marginTop: "3%", marginBottom: "3%", height: 300 }}
        image={`https://gateway.pinata.cloud/ipfs/${ticket.cid}`}
      />
      <Typography>Pricing</Typography>
      <Typography>Tickets Left</Typography>
    </Box>
  );
};

export default ViewTicket;

// https://gateway.pinata.cloud/ipfs/QmcesxD5ttRexNCZ6i6ra9D8iXoqFbxiEmXuwN3NKJz29D

//to connect pinata image to event, we need to add a CID property to the ticket entitiy.
