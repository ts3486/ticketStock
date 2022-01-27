import React, { useState } from "react";
import { Dialog, Button } from "@material-ui/core";
import ViewTicket from "./ViewTicket";
import PurchaseDetails from "./PurchaseDetails";
import CompletePurchase from "./CompletePurchase";
import { useSendTicketMutation } from "../../generated/graphql";

const BuyTicket: React.FC<any> = ({ ticket }: any) => {
  const [open, setOpen] = useState(false);
  const [cpage, setCpage] = useState(1);
  const [sendTicket] = useSendTicketMutation();

  const handleDialog = () => {
    setOpen(false);
  };

  console.log("ticket to purchase: " + ticket.id, typeof ticket.id);

  const page = () => {
    if (cpage == 1) {
      return (
        <div>
          <ViewTicket />
          <Button onClick={() => setCpage(2)}>Purchase Details</Button>
        </div>
      );
    } else if (cpage == 2) {
      return (
        <div>
          <PurchaseDetails />
          <Button
            onClick={() => {
              sendTicket({
                variables: {
                  id: ticket.id,
                },
              });
              setCpage(3);
            }}>
            Complete Purchase
          </Button>
        </div>
      );
    } else if (cpage == 3) {
      return (
        <div>
          <CompletePurchase />
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      );
    }
  };

  return (
    <div className="transaction">
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Ticket
      </Button>
      <Dialog open={open}>{page()}</Dialog>
    </div>
  );
};

export default BuyTicket;
