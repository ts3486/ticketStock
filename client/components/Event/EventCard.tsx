import React from "react";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Link } from "@mui/material";
import indexStyles from "../../styles/Index.module.css";

interface Event {
  event: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
}

const EventItem: React.FC<Event> = (props: Event) => {
  return (
    <Card sx={{ borderRadius: 2, height: 300, width: 350, margin: 2 }}>
      <CardActionArea href={`/event/${props.event.id}`}>
        {/* <CardMedia image={props.event.image} /> */}
        <CardMedia sx={{ height: 200, width: 350 }} image="event.jpg" />
        <CardContent>
          <Typography sx={{ color: "purple" }} variant="body2" component="h2">
            Date
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventItem;
