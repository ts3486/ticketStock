import React, { useState } from "react";
import { useSendTicketMutation } from "../../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { PinDropSharp } from "@material-ui/icons";

interface Event {
  event: {
    title: string;
    image: string;
    description: string;
  };
}

const createdDialog: React.FC<any> = (props: any) => {
  const [open, setOpen] = useState(false);

  const closePDialog = () => {
    props.closePDialog();
  };

  return (
    <Container sx={{ height: "100%" }}>
      <DialogTitle>Your purchase has been completed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom variant="h5" component="h2">
            Enjoy the event!
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Container>
  );
};

export default createdDialog;
