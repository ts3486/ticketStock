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
    <Card className={indexStyles.eventCard}>
      <CardActionArea href={`/event/${props.event.id}`}>
        <CardMedia image={props.event.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          <Link href="/event">Tickets</Link>
        </Button> */}
        <Button size="small" color="primary">
          <Link href={`/event/${props.event.id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventItem;
