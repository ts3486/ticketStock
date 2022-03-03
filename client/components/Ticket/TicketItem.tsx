import React from "react";
import { Card, CardMedia, Typography} from "@mui/material";
import { Ticket } from "../../types/types";

interface Props {
  ticket: Ticket
}

const TicketItem: React.FC<Props> = (props: Props) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 1,
        padding: 3,
        width: "30%",
      }}>
      <CardMedia sx={{ height: 100, width: 170, borderRadius: 3 }} image="/ticket.jpeg" />

      <Typography> Name & Date</Typography>
    </Card>
  );
};

export default TicketItem;
