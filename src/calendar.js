import React, { useState, useContext, useEffect } from "react";
import "./calendar.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import { Link } from "react-router-dom";
import { format, isSameMinute, parseISO } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

function Calendar() {
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
      const currentTime = new Date();
      savedEvents.forEach(event => {
        const eventTime = parseISO(event.dateTime);
        if (isSameMinute(currentTime, eventTime)) {
          toast.info(`Event "${event.title}" is happening now!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Send an additional alert to the user
          alert(`Reminder: Your event "${event.title}" is happening now!`);
        }
      });
    }, 10000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <a className="navbar-brand" href=""><i className='uil uil-user'></i> Hi User!</a>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link"><span data-hover="Home">Home</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link"><span data-hover="Jobs">Find Job</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/homeee" className="nav-link"><span data-hover="CVs">Create CV</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/cvreview" className="nav-link"><span data-hover="Review">CV Review</span></Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link" id="active"><span data-hover="Meeting">Meeting scheduling</span></Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-lg-auto">
            <div className="ml-lg-4">
              <div className="color-mode d-lg-flex justify-content-center align-items-center">
                <div className="checkbox">
                  <input type="checkbox" defaultChecked={checked} onChange={toggleThemeChange} id="themeToggle" />
                  <label htmlFor="themeToggle"></label>
                  <span className="color-mode-text">Color Mode</span>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <li className="nav-item">
          <Link to="/log"><button className="nav-link11">
            <span data-hover="Log Out">Log Out</span>
          </button></Link>
        </li>
      </nav>
      <React.Fragment>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </React.Fragment>
      <div id="contact11">
        <div className="main-content1">
          <div className="left box1">
            <h2>About us</h2>
            <div className="content1">
              HRMS empowers businesses with AI, streamlining HR processes for efficient management. Elevate success with advanced tools, from recruitment to performance management.
              <div className="social">
                <a href="https://www.facebook.com/profile.php?id=61558865784354"><FontAwesomeIcon icon={faFacebook} className='fas' /></a>
                <a href="https://twitter.com/HBotix13985"><FontAwesomeIcon icon={faTwitter} className='fas' /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} className='fas' /></a>
                <a href="https://www.youtube.com/channel/UCrEDZ1Cx6qj-wHDTGei2tbA"> <FontAwesomeIcon icon={faYoutube} className='fas' /></a>
              </div>
            </div>
          </div>
          <div className="center box1">
            <h2>Address</h2>
            <div className="content1">
              <div className="place">
                <CiLocationOn icon={CiLocationOn} className='fas' />
                <span className="text1">Assuit&Sohag, Egypt</span>
              </div>
              <div className="phone">
                <CiPhone icon={CiPhone} className='fas' />
                <span className="text1">+201033239589</span>
              </div>
              <div className="email">
                <CiMail icon={CiMail} className='fas' />
                <span className="text1">hrbotix@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="right box1">
            <h2>Contact us</h2>
            <div className="content1">
              <form action="#">
                <div className="email">
                  <div className="text1">Email *</div>
                  <input type="email" required />
                </div>
                <div className="msg">
                  <div className="text1">Message *</div>
                  <textarea name="" id="" cols="25" rows="2" required></textarea>
                </div>
                <div className="btn">
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom">
          <center>
            <span className="credit">Created By <a href="https://img.youm7.com/large/20180921014209429.jpg">Emam Ashour</a> | </span>
            <span className="far fa-copyright"></span><span> 2024 All rights reserved.</span>
          </center>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Calendar;
