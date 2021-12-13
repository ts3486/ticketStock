import React, { useState, useEffect } from "react";
import TicketItem from "../components/Ticket/TicketItem";
import mintStyles from "../styles/Mint.module.css";

const mintComponent: React.FC = ({ drizzle }: any) => {
  const [tickets, setTickets] = useState<string[]>([]);
  const [ticket, setTicket] = useState("");

  const fetchData = async () => {
    const contract = await drizzle.contracts.Ticket;

    const totalSupply = await contract.methods.totalSupply().call();
    const ticketList: string[] = [];

    for (let i = 0; i < totalSupply; i++) {
      const ticket = await contract.methods.tickets(i).call();
      ticketList.push(ticket);
    }

    setTickets(ticketList);
  };

  const mint = async () => {
    const contract = await drizzle.contracts.Ticket;

    //setting gasLimit and gasPrice was crucial.
    contract.methods.mint(ticket).send({ from: drizzle.account, gas: "1000000", gasPrice: "100000" });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className={mintStyles.home}>
      <div>
        <h2> Issue Tickets</h2>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mint();
            }}>
            <input
              type="text"
              className="form-control mb-1"
              placeholder="e.g. ticket1"
              onChange={(e) => {
                setTicket(e.target.value);
              }}
            />
            <input type="submit" className="btn btn-block btn-primary" value="MINT" />
          </form>
        </div>
      </div>

      <div className={mintStyles.tcontainer}>
        {tickets.map((ticket, index: number) => (
          <TicketItem ticketData={ticket} key={index} />
        ))}
      </div>
    </div>
  );
};

export default mintComponent;
