import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Button } from "@mui/material";
import ViewTicket from "./ViewTicket";
import PurchaseDetails from "./PurchaseDetails";
import CompletePurchase from "./CompletePurchase";
import { useSendTicketMutation } from "../../generated/graphql";
import getWeb3 from "../../functions/web3/getWeb3";
import { transferTicket } from "../../functions/web3/transferTicket";

const BuyTicket: React.FC<any> = ({ ticket }: any) => {
  const [open, setOpen] = useState(false);
  const [cpage, setCpage] = useState(1);
  const [account, setAccount] = useState("");
  const [sendTicket] = useSendTicketMutation();

  useEffect(() => {});

  const handleDialog = () => {
    setOpen(false);
  };

  const onPurchase = () => {
    // sendTicket({
    //   variables: {
    //     id: ticket.id,
    //   },
    // });

    //mint ticket
    transferTicket(account, ticket.cid);
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
          <Button variant="contained" onClick={() => setCpage(2)}>
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
          <Button variant="contained" onClick={() => setOpen(false)} sx={{}}>
            Close
          </Button>
        </Box>
      );
    }
  };

  return (
    <div className="transaction">
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setOpen(true);
          onPurchase();
        }}>
        Ticket
      </Button>
      <Dialog
        open={open}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <DialogContent sx={{ height: 500, width: 600 }}>{page()}</DialogContent>
        <Button variant="contained" onClick={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

export default BuyTicket;
