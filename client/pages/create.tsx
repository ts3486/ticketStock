import React, { useState, useEffect } from "react";
import { useAddEventMutation, useMeQuery } from "../generated/graphql";
import getWeb3 from "../functions/web3/getWeb3";
import detectEthereumProvider from "@metamask/detect-provider";
import { pinFileToIPFS } from "../functions/pinata/pinFile";
import { mintTicket } from "../functions/web3/mintTicket";
import { Button, Box, Dialog } from "@mui/material";
import EventDetailsForm from "../components/Create/EventDetailsForm";
import TicketDetailsForm from "../components/Create/TicketDetailsForm";
import ConfirmEvent from "../components/Create/ConfirmEvent";
import CreatedDialog from "../components/Create/CreatedDialog";
import { EventInput, TicketInput, User } from "../types/types";

const CreateEvent = () => {
  const [event, setEvent] = useState<EventInput>({} as EventInput);
  const [eventFile, setEventFile] = useState<File>({} as File);
  const [ticket, setTicket] = useState<TicketInput>({} as TicketInput);
  const [ticketFile, setTicketFile] = useState<File>({} as File);
  const [tokenId, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [addEvent] = useAddEventMutation();

  //current user
  const { loading, error, data } = useMeQuery();
  const currentUser = data?.me;

  useEffect(() => {
    // authRedirect();  Want to redirect to login page if no login token.

    //getWeb3 account
    getWeb3();
  }, []);

  const submit = () => {
    const metamaskAccount = window.localStorage.getItem("metamaskAccount");

    if (metamaskAccount != null) {
      console.log(event, ticket);

      //Pin file and metadata to pinata => then mint ticket using image/metadata URI from pinata.
      pinFileToIPFS(ticketFile, ticket).then((response: any) => {
        setTicket({ ...ticket, ["cid"]: response.data.IpfsHash.replace(/\"/g, "") });
      });
      mintTicket(metamaskAccount, ticket.name).then((tokenId) => {
        setId(tokenId);
        console.log("ticket tokenID: " + tokenId);
        setTicket({ ...ticket, tokenId: tokenId });
      });

      //POST to MySQL DB:
      addEvent({
        variables: {
          event: event,
          ticket: ticket,
        },
      });

      //Send file to firebase storage bucket
      // uploadFile(file);
      // uploadFile(ticketFile);

      setOpen(true);

      return true;
    } else {
      console.log("no metamask account. Creation failed");
      return false;
    }
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
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {displayPage()}{" "}
      <Dialog open={open}>
        <CreatedDialog username={currentUser?.username} />
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Dialog>
    </Box>
  );
};

export default CreateEvent;
