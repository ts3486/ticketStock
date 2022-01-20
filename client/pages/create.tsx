import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddEventMutation } from "../generated/graphql";
import formStyles from "../styles/Form.module.css";
import { FormControl, InputLabel, Input, FormHelperText, Button, Card } from "@mui/material";
import TicketSubmitForm from "../components/Ticket/TicketSubmitForm";

interface TicketInput {
  name: string;
  image: string;
  price: number;
  date: Date;
}

const createEvent = ({ drizzle }: any) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [ticket, setTicket] = useState<TicketInput>({} as TicketInput);
  const [ticketFile, setTicketFile] = useState<File>({} as File);
  const [progress, setProgress] = useState(0);
  const [desc, setDesc] = useState("");
  const [addEvent] = useAddEventMutation();

  useEffect(() => {
    // authRedirect();  Want to redirect to login page if no login token.
  }, []);

  const handleTicketData = (ticket: TicketInput) => {
    setTicket(ticket);
    console.log(ticket);
  };

  const handleTicketFile = (_file: File) => {
    setTicketFile(_file);
  };

  //firebase function
  const uploadFile = (_file: File) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "images");

    const metadata = {
      contentType: "image/jpeg",
      name: "images/" + _file.name,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        throw error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  //mint ticket
  const mint = async () => {
    const contract = await drizzle.contracts.Ticket;

    //setting gasLimit and gasPrice was crucial.
    contract.methods.mint(ticket).send({ from: drizzle.account, gas: "1000000", gasPrice: "100000" });

    console.log("ticket minted");
  };

  const onSubmit = () => {
    addEvent({
      variables: {
        name: name,
        image: image,
        desc: desc,
        ticket: ticket,
      },
    });

    //Send file to firebase storage
    // uploadFile(file);
    // uploadFile(ticketFile);

    mint();
  };

  return (
    <div className={formStyles.add}>
      <Card className={formStyles.formBox}>
        <h1>Create your event</h1>
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

        <TicketSubmitForm
          ticketData={(_ticket) => handleTicketData(_ticket)}
          ticketFile={(_file) => handleTicketFile(_file)}
        />

        <Button className={formStyles.submitButton} variant="contained" onClick={onSubmit} color="primary">
          Create Event
        </Button>
      </Card>
    </div>
  );
};

export default createEvent;
