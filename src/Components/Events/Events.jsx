import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Events.css'

export default function Home_events() {
  function getAllEvents() {
    return axios.get('https://campus-finder.runasp.net/api/Events/EventsHome')
  }

  const { isError, isFetching, isLoading, data } = useQuery("events", getAllEvents)
  
  const events = data?.data?.$values || [];
  
  const displayedEvents = events.slice(2, 5);

  return (
    <>
      <div className="container events-api mt-5">
        <div className="row justify-content-center">
          {displayedEvents.map((event, idx) => (
            <div key={idx} className="col-md-4 mb-4 d-flex justify-content-center">
              <Link to={`/EventDetails/${event.id}`}>
                <div className="eventcard">
                  <img className='event-img' src={event.pictureURL} alt="event" />
                  <div className="event-info">
                    <h4 className="event-name">{event.name}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* رابط لعرض جميع الأحداث إذا كان هناك أكثر من 3 */}
        {events.length > 3 && (
          <div className="text-center mt-4">
            <Link to="/Allevents">
              <button className="btn-view">View All</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
