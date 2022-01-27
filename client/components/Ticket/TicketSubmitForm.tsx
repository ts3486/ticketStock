import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from "@mui/material";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import formStyles from "../../styles/Form.module.css";

interface Props {
  ticketData: (ticket: { name: string; image: string; date: Date; price: number }) => void;
  ticketFile: (file: File) => void;
}

const TicketSubmitform: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [date, setDate] = useState<Date>(new Date("2021-11-18T21:11:54"));
  const [price, setPrice] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSet = (e: any) => {
    const ticket = { name, image, price, date };

    props.ticketData(ticket);
    props.ticketFile(file);
    e.preventDefault();

    setOpen(false);
  };

  return (
    <div className={formStyles.ticketContainer}>
      <Button className={formStyles.ticketButton} color="primary" variant="contained" onClick={handleClickOpen}>
        Create A Ticket
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Create your custom NFT Ticket here.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Ticket Name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="file"
            id="file"
            aria-describedby="file"
            onChange={(e) => {
              setImage((e.currentTarget as HTMLInputElement).files![0].name);
              setFile((e.currentTarget as HTMLInputElement).files![0]);
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date desktop"
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSet}>Set Ticket</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketSubmitform;
