import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  Input,
} from "@mui/material";
import Transaction from "./BuyTicket";
import formStyles from "../../styles/Create.module.css";

const ViewTicket: React.FC<any> = ({ ticket }: any) => {
  return (
    <Container sx={{ height: "100%" }}>
      <Typography>Event</Typography>
      <Typography>Ticket</Typography>
    </Container>
  );
};

export default ViewTicket;
