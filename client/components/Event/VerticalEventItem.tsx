import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Event } from "../../types/types";

interface Props {
  event: Event;
}

const VerticalEventCard: React.FC<Props> = (props: Props) => {
  return (
    <Card sx={{ borderRadius: 2, height: 200, width: "60%", margin: 2 }}>
      <CardActionArea sx={{ display: "flex", flexDirection: "row-reverse" }} href={`/event/${props.event.id}`}>
        <CardMedia sx={{ height: 200, width: "35%" }} image="/event.jpg" />
        <CardContent sx={{ width: "65%", padding: "5%" }}>
          <Typography sx={{ color: "purple" }} variant="body2" component="h2">
            Date
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VerticalEventCard;
