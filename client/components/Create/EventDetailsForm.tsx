import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Card,
  Container,
  Typography,
  CardMedia,
} from "@mui/material";

interface Props {
  eventData: (event: { name: string; image: string; desc: string; date: Date }) => void;
  eventFile: (file: File) => void;
  page: (page: number) => void;
}

const EventDetailsForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date>(new Date("2021-11-18T21:11:54"));
  const [file, setFile] = useState<File>({} as File);

  const onSet = (e: any) => {
    const event = { name, image, desc, date };

    props.eventData(event);
    props.eventFile(file);
    props.page(2);
    e.preventDefault();
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "10%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h4">Create your event</Typography>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl margin="normal">
          <InputLabel htmlFor="name">Event name </InputLabel>
          <Input id="name" aria-describedby="name" onChange={(e) => setName(e.target.value)} />
          <FormHelperText id="name"></FormHelperText>
        </FormControl>

        <FormControl margin="normal">
          {/* <InputLabel htmlFor="file">File</InputLabel> */}
          <Input
            type="file"
            id="file"
            onChange={(e) => {
              setImage((e.currentTarget as HTMLInputElement).files![0].name);
              setFile((e.currentTarget as HTMLInputElement).files![0]);
            }}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="desc">Description</InputLabel>
          <Input id="desc" aria-describedby="desc" onChange={(e) => setDesc(e.target.value)} />
          <FormHelperText id="desc"></FormHelperText>
        </FormControl>
      </Container>
      <Button
        variant="contained"
        sx={{ marginTop: "2%" }}
        onClick={(e: any) => {
          onSet(e);
        }}>
        STEP 2: Create A Ticket
      </Button>
    </Card>
  );
};

export default EventDetailsForm;
