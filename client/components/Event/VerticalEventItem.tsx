import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Event } from "../../types/types";

interface Props {
  event: Event;
}

const VerticalEventCard: React.FC<Props> = (props: Props) => {
  return (
    <Card sx={{ borderRadius: 2, height: 310, width: "80%", margin: 2 }}>
      <CardActionArea href={`/event/${props.event.id}`}>
        {/* <CardMedia image={props.event.image} /> */}
        <CardMedia sx={{ height: 200, width: "30%" }} image="/event.jpg" />
        <CardContent>
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
