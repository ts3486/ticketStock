import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Link } from "@material-ui/core";

interface Event {
  event: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
}

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  media: {
    height: 140,
  },
});

const EventItem: React.FC<Event> = (props: Event) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/event/${props.event.id}`}>
        <CardMedia className={classes.media} image={props.event.image} />
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
        <Button size="small" color="primary">
          <Link href="/event">Tickets</Link>
        </Button>
        <Button size="small" color="primary">
          <Link href={`/event/${props.event.id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventItem;
