import { Link } from "react-router-dom";
import myImage from './home/images/undraw/undraw_software_engineer_lvl5.svg';
import chatbotIcon from './assets/images/Beige Butterfly Flower Shop Logo.png'; // Add your chatbot icon here
import sendIcon from './assets/images/3795222.png'; // Add your send icon here
import './home/css/style.css';
import React, { useEffect, useState } from 'react';
import './home/css/bootstrap.min.css'
import './home/css/unicons.css'
import './create-cv/css/main.css'

function Home() {
  const [users] = useState([]);
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = React.useRef(null);
  

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };


  
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      fetch('http://127.0.0.1:5001/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          msg: message
        })
      }).then(response => response.json())
      .then(data => {
        setChatHistory(prevChat => [...prevChat, { sender: "Bot", text: data.message}]);
        if (data.running === false) {
          setTimeout(() => {
            toggleChat()
          }, 3000)
        }
      })
      .catch(error => console.error(error))
      setMessage("");
    }
  };

  return (
    <div className='home'>
      <div>
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <a className="navbar-brand" href=""><i className='uil uil-user'></i> Hi User!</a>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="" className="nav-link" id="acctive"><span data-hover="Home">Home</span></Link>
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
                <Link to="/calendar" className="nav-link"><span data-hover="Meeting">Meeting scheduling</span></Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-lg-auto">
              <div className="ml-lg-4">
                <div className="color-mode d-lg-flex justify-content-center align-items-center">
                  <div className="checkbox">
                    <input type="checkbox" defaultChecked={checked} onChange={() => toggleThemeChange()} id="themeToggle" />
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

        <section className="about full-screen d-lg-flex justify-content-center align-items-center" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                <div className="about-text">
                  <small className="small-text111">Welcome to <span className="mobile-block">HRBOTIX website!</span></small>
                  <h1 className="animated animated-text">
                    <span className="lier">Hey {localStorage.getItem("firstName") ? `${localStorage.getItem("firstName")}` : "folks"}, happy to help you to</span>
                    <div className="animated-info">
                      <span className="animated-item">Find a job</span>
                      <span className="animated-item">Creat CVs</span>
                      <span className="animated-item">Make a CV Review</span>
                    </div>
                  </h1>
                  <p>Create a Attractive CV is a challenge. We are very active in creating and designing CVs and recruiting job seekers</p>
                  <div className="custom-btn-group mt-4">
                    <a href="/search" className="btn custom-btn custom-btn-bg custom-btn-link">Find a job</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-12">
                <div className="about-image1 svg">
                  <img src={myImage} className="img-fluid" alt="Software Engineer Illustration" />
                </div>
              </div>
            </div>
          </div>
        </section>











        {/* Chatbot icon */}
<img
  src={chatbotIcon}
  className="chatbot-icon"
  alt="Chatbot Icon"
  onClick={toggleChat}
/>
{showChat && (
  <div className="chatbot-popup animate-popup">
    <div className="chatbot-header">
      Chatbot
      <span className="close-icon" onClick={toggleChat}>×</span>
    </div>
    <div className="chatbot-body">
      {chatHistory.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
    <div className="chatbot-footer">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        placeholder="Type a message"
      />
      <img
        src={sendIcon}
        className="send-icon"
        alt="Send Icon"
        onClick={handleSendMessage}
      />
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Home;
