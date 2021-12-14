import React from "react";
import { client } from "./_app";
import { ALL_EVENTS } from "../gql/queries";
import EventItem from "../components/Event/EventCard";
import homeStyles from "../styles/Home.module.css";

interface Event {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const Index = ({ drizzle, drizzleState, _events }: any) => {
  return (
    <div className={homeStyles.contentContainer}>
      <h1>Events</h1>
      <div className={homeStyles.eventContainer}>
        {_events.map((event: Event) => (
          <EventItem
            event={{ id: event.id, name: event.name, image: event.image, description: event.desc }}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;

export const getStaticProps = async () => {
  const { error, data } = await client.query({
    query: ALL_EVENTS,
    errorPolicy: "all",
  });

  return {
    props: {
      _events: data.allEvents,
    },
  };
};
