import React, { useEffect, useState } from "react";
import { Typography, Container, Box, Dialog, DialogContent, Button } from "@mui/material";
import getWeb3 from "../../functions/web3/getWeb3";
import ViewTicket from "./ViewTicket";
import PurchaseDetails from "./PurchaseDetails";
import CompletePurchase from "./CompletePurchase";
import { useSendTicketMutation } from "../../generated/graphql";
import { transferTicket } from "../../functions/web3/transferTicket";

const BuyTicket: React.FC<any> = ({ ticket }: any) => {
  const [open, setOpen] = useState(false);
  const [cpage, setCpage] = useState(1);
  const [account, setAccount] = useState("");
  const [sendTicket] = useSendTicketMutation();

  useEffect(() => {
    //getWeb3 account
    getWeb3();
  });

  const handleDialog = () => {
    setOpen(false);
  };

  const onPurchase = () => {
    const metamaskAccount = window.localStorage.getItem("metamaskAccount");

    if (metamaskAccount != null) {
      // sendTicket({
      //   variables: {
      //     id: ticket.id,
      //   },
      // });

      //mint ticket
      transferTicket(account, ticket.tokenId);
    }
  };

  console.log("ticket to purchase: " + ticket.id, typeof ticket.id);

  const page = () => {
    if (cpage == 1) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}>
          <ViewTicket ticket={ticket} />
          <Button sx={{}} variant="contained" onClick={() => setCpage(2)}>
            Continue to purchase
          </Button>
        </Box>
      );
    } else if (cpage == 2) {
      getWeb3().then((currentAccount: string) => {
        setAccount(currentAccount);
      });

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}>
          <PurchaseDetails />
          <Button
            variant="contained"
            onClick={() => {
              // onPurchase();
              setCpage(3);
            }}>
            Complete Purchase
          </Button>
        </Box>
      );
    } else if (cpage == 3) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}>
          <CompletePurchase />
        </Box>
      );
    }
  };

  return (
    <Container>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setOpen(true);
          onPurchase();
        }}>
        Ticket
      </Button>
      <Dialog open={open} sx={{}}>
        <Button sx={{ height: 50, width: 600, paddingRight: "5%" }} onClick={() => setOpen(false)}>
          <Typography sx={{ width: "100%" }} align="right">
            X
          </Typography>
        </Button>
        <DialogContent sx={{}}>{page()}</DialogContent>
      </Dialog>
    </Container>
  );
};

export default BuyTicket;
