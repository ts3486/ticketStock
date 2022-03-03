import React, { useState } from "react";
import app from "../../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { GET_TICKETS } from "../../../gql/queries";
import { client } from "../../../apollo";
import { gql } from "@apollo/client";

const TicketPage = ({ ticket }: any) => {
  const [imageURL, setURL] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ margin: "10%", display: "flex", justifyContent: "space-between" }}>
      <Card sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <CardMedia image={`https://gateway.pinata.cloud/ipfs/${ticket.cid}`} sx={{ height: 500, width: "100%" }} />
        <CardContent sx={{ margin: 1 }}>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:
          </Typography>
          {/* <Transaction event={event} /> */}
        </CardContent>
        <CardActions sx={{ margin: 1 }}></CardActions>
      </Card>
      <Card sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
        {/* <CardMedia image={event[3]} title="Contemplative Reptile" /> */}
        <CardContent sx={{ margin: 1 }}>
          <Typography gutterBottom variant="h2" component="h2">
            Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:
          </Typography>
          <CardActions sx={{ margin: 1 }}>
            <Button variant="contained">Make an offer</Button>
          </CardActions>
          <Typography>Bid status: </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export const getStaticPaths = async () => {
  const { error, data } = await client.query({
    query: GET_TICKETS,
    errorPolicy: "all",
  });

  const tickets = data.allTickets;

  const paths = tickets.map((ticket: any) => ({
    params: { id: ticket.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  console.log(params);

  const { error: ticketError, data: ticketData } = await client.query({
    query: gql`
    query {
      getTicket(id: ${params.id}){
        id,
        name,
        cid,
        price,
      }
    }
  `,

    errorPolicy: "all",
  });

  const ticket: any = ticketData.getTicket;

  console.log(ticket);

  return {
    props: {
      ticket,
    },
  };
};

export default TicketPage;
