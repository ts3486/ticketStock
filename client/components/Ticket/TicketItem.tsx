import React from "react";
import ticketStyles from "../../styles/Ticket.module.css";

const TicketItem: React.FC<any> = ({ ticket }) => {
  return (
    <div className={ticketStyles.card}>
      <div>{ticket.name}</div>
      <div> Concert name</div>
      <div> Date </div>
    </div>
  );
};

export default TicketItem;
