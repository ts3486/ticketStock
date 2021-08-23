import Web3 from "web3";
import Ticket from "./contracts/Ticket.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [Ticket],
};

export default options;
