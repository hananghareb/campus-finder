import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import './DetailsEvents.css';

export default function EventDetails() {
  const { id } = useParams();

  function fetchEvent() {
    return axios.get(`https://campus-finder.runasp.net/api/Events/${id}`);
  }

  const { data, isLoading, isError } = useQuery(['eventDetails', id], fetchEvent);

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (isError) return <p className="text-center mt-5 text-danger">Error fetching event 😢</p>;

  const event = data?.data;

  return (
    <div className="event-details-container">
      <div className="event-card">
        <div className="event-image-section">
          <img src={event.pictureURL} alt={event.name} className="event-image" />
        </div>
        <div className="event-info-section">
          <h2 className="event-title text-center">{event.name}</h2>
          <p className="event-description text-center w-90">{event.description}</p>
          <div className="event-info-grid">
            <div><strong>📅 Date:</strong> {new Date(event.date).toLocaleString()}</div>
            <div><strong>📍 Location:</strong> {event.location}</div>
            <div><strong>🔗 Registration:</strong> <a href={`https://${event.registrationLink}`} target="_blank" rel="noreferrer">{event.registrationLink}</a></div>
            <div><strong>📧 Contact:</strong> <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
