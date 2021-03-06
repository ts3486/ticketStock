export interface Event {
  id: number;
  category: string;
  name: string;
  image: string;
  desc: string;
  ticketId?: number;
  longtitude?: number;
  latitdue?: number;
}

export interface EventInput {
  name: string;
  category: string;
  image: string;
  desc: string;
  date: Date;
  longtitude?: number;
  latitdue?: number;
}

export interface Ticket {
  id: number;
  name: string;
  image: string;
  price: number;
  date: Date;
}

export interface TicketInput {
  name: string;
  cid: string;
  tokenId: number;
  price: number;
  date: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
