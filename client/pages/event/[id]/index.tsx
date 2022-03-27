import React, { useState } from "react";
import app from "../../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Container, Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { GET_EVENTS } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";
import BuyTicket from "../../../components/Transaction/BuyTicket";
import Map from "../../../components/externalAPI/googleMaps/maps";
import { Event } from "../../../types/types";

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const EventPage = ({ event, ticket }: any) => {
  console.log(event);

  const [imageURL, setURL] = useState("");
  const [open, setOpen] = useState(false);

  const MapProps: MapProps = {
    center: {
      lat: event.latitude,
      lng: event.longtitude,
    },
    zoom: 16,
  };

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
    <Container sx={{ margin: "10%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 5 }}>
        <Typography variant="h2">{event.name}</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1%" }}>
          <CardMedia image="/event.jpg" title="Contemplative Reptile" sx={{ height: 400, width: "60%" }} />
          <Card sx={{ height: 400, width: "35%" }}>
            <Typography>Date: {event.date} </Typography>
            <Typography>Location: {}</Typography>
            <Map mapProps={MapProps} />
          </Card>
        </Box>
        <CardContent sx={{ margin: 1 }}>
          <Typography>Ticket</Typography>
          <CardMedia
            sx={{ marginTop: "3%", marginBottom: "3%", height: 300, width: "30%" }}
            image={`https://gateway.pinata.cloud/ipfs/${ticket.cid}`}
          />
          <Typography variant="h5" color="textSecondary" component="p">
            Event Description
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            Date:
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            Price:
          </Typography>
          {/* <Transaction event={event} /> */}
        </CardContent>

        <CardActions sx={{ margin: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <BuyTicket ticket={ticket} />
        </CardActions>
      </Box>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const { error, data } = await client.query({
    query: GET_EVENTS,
    errorPolicy: "all",
  });

  const events = data.getEvents;

  const paths = events.map((event: Event) => ({
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
        date,
        ticketId,
        longtitude,
        latitude
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
        cid,
        tokenId,
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
