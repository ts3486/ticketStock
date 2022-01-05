import React, { useEffect, useState } from "react";
import { client } from "./_app";
import { getAccessToken, setAccessToken } from "../components/Auth/accessTokens";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import EventItem from "../components/Event/EventCard";
import homeStyles from "../styles/Home.module.css";

interface Event {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const Home: React.FC = ({ drizzle, drizzleState, _events }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // token authentication
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  });

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

export default Home;

export const getStaticProps = async () => {
  const { error: eventError, data: eventData } = await client.query({
    query: ALL_EVENTS,
    errorPolicy: "all",
  });

  return {
    props: {
      _events: eventData.allEvents,
    },
  };
};
