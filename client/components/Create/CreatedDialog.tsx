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

const CreatedDialog: React.FC<any> = (username: string) => {
  const [open, setOpen] = useState(false);

  return (
    <Container sx={{ height: "100%" }}>
      <DialogTitle>Your event&ticketNFT has been created</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Check your event in your profile page.</Typography>

        <Button onClick={() => (window.location.href = `/profile/${username}`)}>Go to profile</Button>
      </DialogContent>
    </Container>
  );
};

export default CreatedDialog;
