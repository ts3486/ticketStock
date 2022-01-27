import React, { useState } from "react";
import { useSendTicketMutation } from "../../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { PinDropSharp } from "@material-ui/icons";

interface Event {
  event: {
    title: string;
    image: string;
    description: string;
  };
}

const Transaction: React.FC<any> = (props: any) => {
  const [open, setOpen] = useState(false);

  const closePDialog = () => {
    props.closePDialog();
  };

  return (
    <div className="transaction">
      <DialogTitle>Your purchase has been completed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom variant="h5" component="h2">
            Enjoy the event!
          </Typography>
        </DialogContentText>
      </DialogContent>
    </div>
  );
};

export default Transaction;
