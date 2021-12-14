import React, { useState, useEffect } from "react";
import { useAuthRedirectMutation } from "../generated/graphql";
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddEventMutation } from "../generated/graphql";
import formStyles from "../styles/Form.module.css";
import { FormControl, InputLabel, Input, FormHelperText, Button, Box } from "@material-ui/core";
import TicketSubmitForm from "../components/Ticket/TicketSubmitForm";

interface Ticket {
  name: string;
  image: string;
  file: File;
  date: Date;
  price: string;
}

const addEvent: React.FC = ({ drizzle }: any) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [ticket] = useState("");
  const [ticketData, setTicketData] = useState<Ticket>();
  const [ticketFile, setTicketFile] = useState<File>({} as File);
  const [progress, setProgress] = useState(0);
  const [desc, setDesc] = useState("");
  const [addEvent] = useAddEventMutation();
  const [authRedirect] = useAuthRedirectMutation();

  useEffect(() => {
    authRedirect();
  }, []);

  const handleTicketData = (data: Ticket) => {
    setTicketData(data);
    setTicketFile(data.file);
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
  };

  const onSubmit = () => {
    //Send to MySQL
    addEvent({
      variables: {
        name: name,
        image: image,
        desc: desc,
        ticket: ticket,
      },
    });

    //Send file to firebase storage
    uploadFile(file);
    uploadFile(ticketFile);
    mint();
  };

  return (
    <div className={formStyles.add}>
      <Box className={formStyles.formBox}>
        <FormControl margin="normal">
          <InputLabel htmlFor="name">Event name </InputLabel>
          <Input id="name" aria-describedby="name" onChange={(e) => setName(e.target.value)} />
          <FormHelperText id="name"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="image">Image</InputLabel>
          <Input id="image" aria-describedby="image" onChange={(e) => setImage(e.target.value)} />
          <FormHelperText id="image"></FormHelperText>
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="file">File</InputLabel>
          <Input
            type="file"
            id="file"
            aria-describedby="file"
            onChange={(e) => {
              setImage((e.currentTarget as HTMLInputElement).files![0].name);
              setFile((e.currentTarget as HTMLInputElement).files![0]);
            }}
          />
          <FormHelperText id="file"></FormHelperText>
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="desc">Description</InputLabel>
          <Input id="desc" aria-describedby="desc" onChange={(e) => setDesc(e.target.value)} />
          <FormHelperText id="desc"></FormHelperText>
        </FormControl>
        {/* 
        <TicketSubmitForm ticketData={(data) => handleTicketData(data)} /> */}

        <Button className={formStyles.submitButton} variant="contained" onClick={onSubmit} color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default addEvent;
