import React, { useState, useEffect } from "react";
import { client } from "../apollo";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import EventItem from "../components/Event/EventCard";
import indexStyles from "../styles/Index.module.css";

interface Event {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const Index: React.FC = ({ _events }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [_events]);

  return (
    <div className={indexStyles.contentContainer}>
      <h1>Events</h1>
      <div className={indexStyles.eventContainer}>
        {_events &&
          _events.map((event: Event) => (
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
  const { error: eventError, data: eventData } = await client.query({
    query: ALL_EVENTS,
    errorPolicy: "all",
  });

  const events: Event[] = eventData.allEvents;

  return {
    props: {
      _events: events,
    },
  };
};
