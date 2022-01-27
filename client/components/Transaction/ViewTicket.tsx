import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from "@mui/material";
import Transaction from "./BuyTicket";
import formStyles from "../../styles/Form.module.css";

const ViewTicket: React.FC<any> = ({ ticket }: any) => {
  return (
    <div className={formStyles.ticketContainer}>
      <DialogTitle>Event Ticket</DialogTitle>
      <DialogContent>Ticket</DialogContent>
    </div>
  );
};

export default ViewTicket;
