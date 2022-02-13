import React, { useState } from "react";
import { Box, Card, Button, Input, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import formStyles from "../../styles/Create.module.css";

interface Props {
  ticketData: (ticket: { name: string; image: string; date: Date; price: number }) => void;
  ticketFile: (file: File) => void;
  page: (page: number) => void;
}

const TicketCreateForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [date, setDate] = useState<Date>(new Date("2021-11-18T21:11:54"));
  const [price, setPrice] = useState(0);

  const onSet = (e: any) => {
    const ticket = { name, image, price, date };

    props.ticketData(ticket);
    props.ticketFile(file);
    e.preventDefault();
  };

  const editEvent = () => {
    props.page(1);
  };

  const confirmEvent = () => {
    props.page(3);
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "10%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
      }}>
      <Typography variant="h4">Create your ticket</Typography>
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
        hidden
        sx={{ marginTop: 3 }}
        onChange={(e) => {
          setImage((e.currentTarget as HTMLInputElement).files![0].name);
          setFile((e.currentTarget as HTMLInputElement).files![0]);
        }}
      />

      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date desktop"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <TextField
        autoFocus
        margin="dense"
        label="Price"
        fullWidth
        variant="standard"
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <Button sx={{ marginTop: "2%" }} onClick={() => editEvent()}>
        Edit Event
      </Button>

      <Button
        variant="contained"
        sx={{ marginTop: "2%" }}
        onClick={(e: any) => {
          onSet(e);
          confirmEvent();
        }}>
        STEP 3: Confirm Event
      </Button>
    </Card>
  );
};

export default TicketCreateForm;
