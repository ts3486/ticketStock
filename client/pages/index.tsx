import React, { useEffect } from "react";
import { client } from "../apollo";
import { ALL_EVENTS, GET_USER } from "../gql/queries";
import Header from "../components/General/Header";
import EventList from "../components/Event/EventList";
import TopPicks from "../components/Event/TopPicks";

const Index: React.FC = ({ _events }: any) => {
  useEffect(() => {}, [_events]);

  return (
    <div>
      <Header />
      <EventList _events={_events} />
      <TopPicks />
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
  console.log(events);

  return {
    props: {
      _events: events,
    },
  };
};
