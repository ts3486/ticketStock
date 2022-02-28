import React, { useState } from "react";
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
import CompletePurchase from "./CompletePurchase";

const Transaction: React.FC<any> = ({ ticket }: any) => {
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ height: "100%" }}>
      <DialogTitle>Complete your purchase</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Event Title:</Typography>
        <Typography>Date: {}</Typography>
        <Typography>Price: {}</Typography>
      </DialogContent>
    </Container>
  );
};

export default Transaction;
