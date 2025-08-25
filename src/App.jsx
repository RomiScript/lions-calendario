import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "./App.css";
import logo from "./assets/logo.png";

export default function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    importancia: "normal",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: info.dateStr });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start) return;
    setEvents([
      ...events,
      {
        title: newEvent.title,
        start: newEvent.start,
        importancia: newEvent.importancia,
      },
    ]);
    setNewEvent({ title: "", start: "", importancia: "normal" });
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      startStr: info.event.startStr,
      importancia: info.event.extendedProps.importancia,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="app">
      {/* Logo */}
      <header className="app-header">
        <img src={logo} alt="Logo Lions" className="logo" />
        <h1>Calendario de Eventos</h1>
      </header>

      {/* Formulario */}
      <form className="event-form" onSubmit={addEvent}>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Nombre del evento"
          required
        />
        <input
          type="date"
          name="start"
          value={newEvent.start}
          onChange={handleInputChange}
          required
        />
        <select
          name="importancia"
          value={newEvent.importancia}
          onChange={handleInputChange}
        >
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
          <option value="baja">Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

      {/* Calendario */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale={esLocale}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Fecha:</strong> {selectedEvent.startStr}</p>
            <p><strong>Importancia:</strong> {selectedEvent.importancia}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}


