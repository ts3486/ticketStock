import React, { useState, useEffect } from "react";
import app from "../firebase";
import { uploadFile } from "../functions/firebase/upload.ts";
import { pinFileToIPFS } from "../functions/pinata/pinFileToIPFS";
import {ethers} from "ethers";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAddEventMutation } from "../generated/graphql";
import formStyles from "../styles/Create.module.css";
import { Box } from "@mui/material";
import EventDetailsForm from "../components/Create/EventDetailsForm";
import TicketDetailsForm from "../components/Create/TicketDetailsForm";
import ConfirmEvent from "../components/Create/ConfirmEvent";
const Web3 = require("web3");
const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/0f3a6fad96f04d13bbbf4654d9099af7");
const nftBuild = require("../../build/contracts/TicketNFT.json");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address);
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address); for ganache
const { mnemonic, publicKey, privateKey } = require("../secret.json");

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
interface Metadata {
  name: sstring;
  price: number;
}

const createEvent = ({ drizzle }: any) => {
  const [event, setEvent] = useState<EventInput>({} as EventInput);
  const [eventFile, setEventFile] = useState<File>({} as File);
  const [ticket, setTicket] = useState<TicketInput>({} as TicketInput);
  const [ticketFile, setTicketFile] = useState<File>({} as File);
  const [_metadata, setMetadata] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [addEvent] = useAddEventMutation();

  useEffect(() => {
    // authRedirect();  Want to redirect to login page if no login token.
  }, []);

  // mint ticket
  const mintTicket = async (ticketURI) => {
    console.log(contract);
    const baseCost = await contract.methods.cost().call();
    const txnCount = await web3.eth.getTransactionCount(account);
    const nonce = await ethers.utils.hexlify(txnCount);

    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        from: account,
        nonce: nonce,
        to: "0x1EB590B195F9463b19C612BaA6b947622434DdF3",
        value: baseCost,
        gas: 500000,
        data: contract.methods.mintTicket(ticketURI).encodeABI(),
      },
      privateKey
    );

    const createReceipt = await web3.eth
      .sendSignedTransaction(createTransaction.rawTransaction)
      .once("sending", () => {
        console.log("sending...");
        setLoading(true);
        setOpen(true);
      })
      .once("sent", () => {
        console.log("sent");
      })
      .on("confirmation", (confNumber: any, receipt: any, latestBlockHash: any) => {
        console.log(confNumber, receipt, latestBlockHash);
        setLoading(false);
      })
      .on("error", (error: any) => {
        console.log(error);
      });

    console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);

    console.log(`ticketNFT minted`);
  };

  const onSubmit = () => {
    addEvent({
      variables: {
        event: event,
        ticket: ticket,
      },
    });

    //Send file to firebase storage
    // uploadFile(file);
    // uploadFile(ticketFile);
    //pinFileToIPFS(_metadata)
    // mintTicket(_metadata.name);
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
      return <ConfirmEvent event={event} eventFile={eventFile} ticket={ticket} ticketFile={ticketFile} />;
    }
  };

  //DOM 
  return <Box sx={{ display: "flex", justifyContent: "center" }}>{displayPage()}</Box>;
};

export default createEvent;
