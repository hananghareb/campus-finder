import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Allevents.css';

export default function AllEvents() {
  function getAllEvents() {
    return axios.get('https://campus-finder.runasp.net/api/Events/EventsHome');
  }

  const { isLoading, isError, data } = useQuery('allEvents', getAllEvents);

  const events = data?.data?.$values?.slice(0, 7) || [];

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (isError) return <p className="text-center mt-5 text-danger">Something went wrong 😢</p>;

  return (
    <div className="container all-events-page mt-5">
      <h2 className="text-center mb-5 maincolor">All Events</h2>
      <div className="row">
        {events.slice(0, 3).map((event, idx) => (
          <div key={idx} className="col-md-4 mb-4 d-flex justify-content-center">
            <EventCard event={event} />
          </div>
        ))}
      </div>
      <div className="row">
        {events.slice(3, 6).map((event, idx) => (
          <div key={idx} className="col-md-4 mb-4 d-flex justify-content-center">
            <EventCard event={event} />
          </div>
        ))}
      </div>
      {events[6] && (
        <div className="row justify-content-center g-5">
          <div className="col-md-4 mb-4 d-flex  justify-content-center">
            <EventCard event={events[6]} />
          </div>
        </div>
      )}
    </div>
  );
}
function EventCard({ event }) {
  return (
    <Link to={`/EventDetails/${event.id}`} className="eventcard-link">
      <div className="eventcard p-4">
        <img className="event-img " src={event.pictureURL} alt="event" />
        <div className="event-info">
          <h4 className="event-name">{event.name}</h4>
        </div>
      </div>
    </Link>
  );
}
