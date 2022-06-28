
export default function EventList({events, handleClick}) {
  

  return (
    <div>
      {events.map((event) => (
          <h2 key={event.id}>
            {event.title}
            <p>{event.location} - {event.date}</p>
            <p>type - {event.type}</p>
            <button onClick={() => handleClick(event.id)}>delete event</button>
          </h2>))
      }
    </div>
  )
}
