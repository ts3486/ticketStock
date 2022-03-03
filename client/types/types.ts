export interface Event {
  id: string;
  category: string;
  name: string;
  image: string;
  description: string;
  ticketId: number;
}

export interface EventInput {
  name: string;
  category: string;
  image: string;
  desc: string;
  date: Date;
}

interface Ticket {
  id: number;
  name: string;
  image: string;
  price: number;
  date: Date;
}

export interface TicketInput {
  name: string;
  cid: string;
  price: number;
  date: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
