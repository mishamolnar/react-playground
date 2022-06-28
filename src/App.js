import './App.css';
import { useState } from 'react'
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';
import NewEventsFrom from './components/NewEventsFrom';
import useFetch from './hooks/useFetch';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([])
  const [url, setUrl] = useState('http://localhost:3000/events')
  const { data, isPending, error } = useFetch(url);

  console.log(data)

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      return [...prevEvents, event]
    })

    setShowModal(false)
    }
 
  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => event.id !== id)
    })
    console.log(id)
  }

  const handleClose = () => {
    console.log(showModal)
    setShowModal(false)
  }

  return (
    <div className="App">
      <Title title="Events near you" subtitle="some events" />
      <button onClick={() => setShowModal(true)}>show modal</button>
      {showEvents && <div>
        <button onClick={() => setShowEvents(false)}> hide events </button>
      </div>}
      {!showEvents && <div>
        <button onClick={() => setShowEvents(true)}> show events </button>
      </div>}
      <div>
        <p>Filter Events</p>
        <button onClick={() => setUrl('http://localhost:3000/events')}>Show all</button>
        <button onClick={() => setUrl('http://localhost:3000/events?type=birthday')}>Show birthdays</button>
        <button onClick={() => setUrl('http://localhost:3000/events?type=funeral')}>Show funerals</button>
      </div>
      {isPending && <div>loading...</div>}
      {error && <div>Something went wrong</div>}
      {showEvents && data && <EventList events={data} handleClick={handleClick}/>}
      {showModal && 
        <Modal handleClose={handleClose}>
          <NewEventsFrom addEvent={addEvent}/>
        </Modal>}
    </div>
  );
}

export default App;
