import React, { useState } from "react";
import app from "../../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { ALL_EVENTS } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";
import BuyTicket from "../../../components/Transaction/BuyTicket";
import eventStyles from "../../../styles/event.module.css";

interface Event {
  event: {
    id: string;
    name: string;
    image: string;
    description: string;
    ticketId: number;
  };
}

const EventPage = ({ event, ticket }: any) => {
  const [imageURL, setURL] = useState("");
  const [open, setOpen] = useState(false);

  // const storage = getStorage(app);

  // //firebase image download
  // getDownloadURL(ref(storage, "images"))
  //   .then((url) => {
  //     // Insert url into an <img> tag to "download"
  //     setURL(url);
  //   })
  //   .catch((error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case "storage/object-not-found":
  //         // File doesn't exist
  //         break;
  //       case "storage/unauthorized":
  //         // User doesn't have permission to access the object
  //         break;
  //       case "storage/canceled":
  //         // User canceled the upload
  //         break;

  //       // ...

  //       case "storage/unknown":
  //         // Unknown error occurred, inspect the server response
  //         break;
  //     }
  //   });

  return (
    <div className={eventStyles.container}>
      <div className={eventStyles.eventContainer}>
        <Card className={eventStyles.card}>
          <CardActionArea href={`/event/${event[1]}`}>
            <CardMedia image={event[3]} title="Contemplative Reptile" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {event[2]}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Date:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Price:
              </Typography>
              {/* <Transaction event={event} /> */}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <BuyTicket ticket={ticket} />
          </CardActions>
        </Card>
        <Box>
          <Typography gutterBottom variant="h5" component="h2">
            About this event:
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Links:
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Socials:
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { error, data } = await client.query({
    query: ALL_EVENTS,
    errorPolicy: "all",
  });

  const events = data.allEvents;

  const paths = events.map((event: Event["event"]) => ({
    params: { id: event.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { error: eventError, data: eventData } = await client.query({
    query: gql`
    query {
      getEvent(id: ${params.id}){
        id,
        name,
        image,
        desc,
        ticketId
      }
    }
  `,

    errorPolicy: "all",
  });

  const event: any = eventData.getEvent;

  const { error: ticketError, data: ticketData } = await client.query({
    query: gql`
    query {
      getTicket(id: ${event.ticketId}){
        id,
        name,
        image,
        price,
      }
    }
  `,

    errorPolicy: "all",
  });

  const ticket: any = ticketData.getTicket;

  return {
    props: {
      event,
      ticket,
    },
  };
};

export default EventPage;
