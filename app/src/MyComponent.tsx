import React, { useState, useEffect } from "react";
// import Web3 from "web3";
const { newContextComponents } = require("@drizzle/react-components");
// import Ticket from "./contracts/Ticket.json";

const { AccountData } = newContextComponents;

export default ({ drizzle, drizzleState }: any) => {
  const [tickets, setTickets] = useState<String[]>([]);
  const [ticket, setTicket] = useState("");

  const fetchData = async () => {
    const contract: any = await drizzle.contracts.Ticket;

    const totalSupply: any = await contract.methods.totalSupply().call();
    let ticketList: String[] = [];

    for (let i = 0; i < totalSupply; i++) {
      const ticket = await contract.methods.tickets(i).call();
      ticketList.push(ticket);
    }

    // console.log(ticketList);
    setTickets(ticketList);
  };

  const mint = async (ticket: string) => {
    const contract = await drizzle.contracts.Ticket;
    contract.methods
      .mint(ticket)
      .send({ from: drizzle.account })
      .once("receipt", (receipt: string) => {
        tickets.push(ticket);
        setTickets(tickets);
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>

      <h2 className="section"> Issue Tickets</h2>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            mint(ticket);
          }}
        >
          <input
            type="text"
            className="form-control mb-1"
            placeholder="e.g. #FFFFFF"
            onChange={(e: any) => setTicket(e)}
          />
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="MINT"
          />
        </form>
      </div>

      <div>{tickets}</div>
    </div>
  );
};
