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

const Transaction: React.FC<any> = (props: any) => {
  const [open, setOpen] = useState(false);

  const closePDialog = () => {
    props.closePDialog();
  };

  return (
    <Container sx={{ height: "100%" }}>
      <DialogTitle>Your purchase has been completed</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Enjoy the event!</Typography>
      </DialogContent>
    </Container>
  );
};

export default Transaction;
