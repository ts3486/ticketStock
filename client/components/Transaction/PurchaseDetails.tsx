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
        <DialogContentText>
          <Typography gutterBottom variant="h5" component="h2">
            Event Title:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date: {}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: {}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Container>
  );
};

export default Transaction;
