import React, { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link';
import ClockIcon from '@material-ui/icons/Schedule';
import PaletteIcon from '@material-ui/icons/Palette';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, isSameMinute } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import './EventModal.css';

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [dateTime, setDateTime] = useState(
    selectedEvent ? new Date(selectedEvent.dateTime) : new Date()
  );
  const [employeeName, setEmployeeName] = useState(
    selectedEvent ? selectedEvent.employeeName : ""
  );
  const [employeeEmail, setEmployeeEmail] = useState(
    selectedEvent ? selectedEvent.employeeEmail : ""
  );
  const [link, setLink] = useState(  
    selectedEvent ? selectedEvent.link : ""
  );

  function handleTimeChange(date) {
    setDateTime(date);
    toast(`Time selected: ${format(date, 'PPpp')}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      dateTime: dateTime.toISOString(),
      employeeName,
      employeeEmail,
      link
    };

    // Save event to localStorage
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    if (selectedEvent) {
      const updatedEvents = savedEvents.map(event =>
        event.id === selectedEvent.id ? calendarEvent : event
      );
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      savedEvents.push(calendarEvent);
      localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="boxx bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <DeleteIcon className="text-gray-400" />
          <div>
            {selectedEvent && (
              <DeleteIcon
                onClick={() => {
                  const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
                  const updatedEvents = savedEvents.filter(event => event.id !== selectedEvent.id);
                  localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="text-gray-400 cursor-pointer"
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <CloseIcon className="text-gray-400" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="inputstyle"
              onChange={(e) => setTitle(e.target.value)}
            />
            <PersonIcon className="text-gray-400" />
            <input
              type="text"
              name="employeeName"
              placeholder="Name"
              value={employeeName}
              className="inputstyle"
              onChange={(e) => setEmployeeName(e.target.value)}
            />
            <EmailIcon className="text-gray-400" />
            <input
              type="email"
              name="employeeEmail"
              placeholder="Email"
              value={employeeEmail}
              className="inputstyle"
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />
            <LinkIcon className="text-gray-400" />
            <input
              type="url"
              name="link"
              placeholder="Link"
              value={link}
              className="inputstyle"
              onChange={(e) => setLink(e.target.value)}
            />
            <ScheduleIcon className="text-gray-400" />
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <ClockIcon className="text-gray-400" />
            <DatePicker
              selected={dateTime}
              onChange={handleTimeChange}
              showTimeSelect
              dateFormat="Pp"
              className="inputstyle"
            />
            <BookmarkBorderIcon className="text-gray-400" />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="inputstyle"
              onChange={(e) => setDescription(e.target.value)}
            />
            <PaletteIcon className="text-gray-400" />
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <CheckIcon className="text-white text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
      <ToastContainer />
    </div>
  );
}
