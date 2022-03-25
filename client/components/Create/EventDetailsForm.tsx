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
  Select,
  MenuItem,
} from "@mui/material";
import { EventInput } from "../../types/types";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const Geocode = require("react-geocode");
const { googleMapsApiKey } = require("../../secret.json");

interface Props {
  eventData: (event: EventInput) => void;
  eventFile: (file: File) => void;
  page: (page: number) => void;
}

const EventDetailsForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date>(new Date("2021-11-18T21:11:54"));
  const [file, setFile] = useState<File>({} as File);
  const [address, setAddress] = useState("");
  const [longtitude, setLongtitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  Geocode.setApiKey(googleMapsApiKey);

  Geocode.fromAddress("Eiffel Tower").then(
    (response: any) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error: any) => {
      console.error(error);
    }
  );

  const onSet = (e: any) => {
    const event = { name, category, image, desc, date, longtitude, latitude };

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

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={(e: any) => setCategory(e?.target.value)}>
            <MenuItem value={"culture"}>Culture</MenuItem>
            <MenuItem value={"creative"}>Creative</MenuItem>
            <MenuItem value={"exercise"}>Exercise</MenuItem>
            <MenuItem value={"career"}>Career</MenuItem>
            <MenuItem value={"tech"}>Tech</MenuItem>
            <MenuItem value={"performance"}>Performance</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <GooglePlacesAutocomplete
            apiKey={googleMapsApiKey}
            apiOptions={{ language: "jp", region: "jp" }}
            autocompletionRequest={{
              // bounds: [
              //   { lat: 50, lng: 50 },
              //   { lat: 100, lng: 100 },
              // ],
              componentRestrictions: {
                country: ["us", "jp"],
              },
              // types: ["country", "locality", "sublocality", "postal_code"],
            }}
            selectProps={{
              address,
              onChange: setAddress,
            }}
          />
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
