import React, { useState, useEffect } from "react";
import { useAddEventMutation, usePinFileMutation } from "../generated/graphql";
import getWeb3 from "../functions/web3/getWeb3";
import { pinFileToIPFS } from "../functions/pinFile";
import { mintTicket } from "../functions/web3/mintTicket";
import { Box } from "@mui/material";
import EventDetailsForm from "../components/Create/EventDetailsForm";
import TicketDetailsForm from "../components/Create/TicketDetailsForm";
import ConfirmEvent from "../components/Create/ConfirmEvent";

interface EventInput {
  name: string;
  image: string;
  desc: string;
  date: Date;
}
interface TicketInput {
  name: string;
  image: string;
  price: number;
  date: Date;
}

const createEvent = () => {
  const [event, setEvent] = useState<EventInput>({} as EventInput);
  const [eventFile, setEventFile] = useState<File>({} as File);
  const [ticket, setTicket] = useState<TicketInput>({} as TicketInput);
  const [ticketFile, setTicketFile] = useState<File>({} as File);
  const [progress, setProgress] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [account, setAccount] = useState("");
  const [addEvent] = useAddEventMutation();
  const [pinFile] = usePinFileMutation();

  useEffect(() => {
    // authRedirect();  Want to redirect to login page if no login token.

    //getWeb3 account
    getWeb3().then((currentAccount) => {
      setAccount(currentAccount);
    });

    console.log("metamask account: " + account);
  }, []);

  const submit = () => {
    // addEvent({
    //   variables: {
    //     event: event,
    //     ticket: ticket,
    //   },
    // });

    //Send file to firebase storage
    // uploadFile(file);
    // uploadFile(ticketFile);

    //Pin file and metadata to pinata => then mint ticket using image/metadata URI from pinata.
    pinFileToIPFS(ticketFile, ticket);
    mintTicket(account, ticket.name);

    return true;
  };

  const displayPage = () => {
    if (currentPage == 1) {
      return (
        <EventDetailsForm
          eventData={(_event) => setEvent(_event)}
          eventFile={(_file) => setEventFile(_file)}
          page={(_page) => setPage(_page)}
        />
      );
    }
    if (currentPage == 2) {
      return (
        <TicketDetailsForm
          ticketData={(_ticket) => setTicket(_ticket)}
          ticketFile={(_file) => setTicketFile(_file)}
          page={(_page) => setPage(_page)}
        />
      );
    }
    if (currentPage == 3) {
      return (
        <ConfirmEvent
          event={event}
          eventFile={eventFile}
          ticket={ticket}
          ticketFile={ticketFile}
          completion={() => submit()}
        />
      );
    }
  };

  //DOM
  return <Box sx={{ display: "flex", justifyContent: "center" }}>{displayPage()}</Box>;
};

export default createEvent;
