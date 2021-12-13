import React from "react";
import ticketStyles from "../../styles/Ticket.module.css";

const TicketItem: React.FC<any> = ({ ticketData }) => {
  return (
    <div className={ticketStyles.card}>
      <h3>{ticketData}</h3>
      <div> Concert name</div>
      <div> Date </div>
    </div>
  );
};

export default TicketItem;
