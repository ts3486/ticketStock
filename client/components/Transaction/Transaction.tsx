import React, { useState } from "react";
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

interface Event {
  event: {
    title: string;
    image: string;
    description: string;
  };
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Transaction: React.FC<Event> = (props: Event) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <div className="transaction">
      <Button onClick={() => setOpen(true)}>Purchase</Button>
      <Dialog open={open}>
        <DialogTitle>Secure your ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom variant="h5" component="h2">
              {props.event.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Date: {}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button />
          <Button />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Transaction;
