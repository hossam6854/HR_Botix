import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
import { CiLocationOn,CiMail,CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
import { text } from '@fortawesome/fontawesome-svg-core';


const UserSearch = () => {
  const [speciality, setSpeciality] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:3000/users?speciality=${speciality}`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [speciality]);

  const inputStyle = {
    padding: '15px 20px',  // Increased padding for a more bountiful look
    fontSize: '16px',
    width: '1450px',
    marginBottom: '25px',
    marginLeft: '30px', 
    border: '2px solid #ddd',  // Added border
    borderRadius: '25px',  // Rounded corners
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle box shadow
    outline: 'none',  // Remove default outline
    transition: 'border-color 0.3s ease',  // Smooth transition for border color on focus
};

  const containerStyle = {
    display: 'flex',
};

const userStyle = {
    backgroundColor: '#ff7e7e',
    padding: '20px',
    marginLeft: '20px', 
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0.3em 0.3em 1em rgb(160, 195, 245)',
    transition: '0.3s',
    width: 'calc(30.333% - 100px)',  // Adjust width to fit three boxes in a row
    cursor: 'pointer',
};

  const nameStyle = {
    color:'black',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const specialityStyle = {
    fontSize: '16px',
    color: 'white',
    marginTop: '10px',
    textAlign: 'center'
    

  };
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);

   
    useEffect(() => {
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
    }, [checked]);
  
    /**
     * Update the state of checked and the content of our theme object
     * in localStorage based on the checkbox toggle
     */
    const toggleThemeChange = () => {
      if (checked === false) {
        localStorage.setItem("theme", "dark");
        
        setChecked(true);
      } else {
        localStorage.setItem("theme", "light");
  
        setChecked(false);
      }
    }

  return (
    <div>



<nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
            <a className="navbar-brand" href=""><i className='uil uil-user'></i>Hi Businessman!</a>

            
                 
            <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to="/homebusinessman" className="nav-link"><span data-hover="Home">Home</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/addjop" className="nav-link"><span data-hover="Jops">add Jop</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link to="" className="nav-link"><span data-hover="Review" id="acctive">Find a employee</span></Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-lg-auto">
                    <div className="ml-lg-4">
                      <div className="color-mode d-lg-flex justify-content-center align-items-center">
                      <div className="checkbox">
                        <input type="checkbox"    defaultChecked={checked}   onChange={() => toggleThemeChange()}  id="themeToggle" />
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






    <input
    type="text"
    placeholder="Search by speciality"
    value={speciality}
    onChange={e => setSpeciality(e.target.value)}
    style={inputStyle}
/>

<div style={containerStyle}>
  {users.map(user => (
    <div key={user.id} style={userStyle}>
      <h2 style={nameStyle}>{user.firstName} {user.lastName}</h2>
      <h2 style={nameStyle}>{user.email}</h2>
      <p style={specialityStyle}>{user.jobSpeciality}</p>
    </div>
  ))}
</div>






           
<div id="contact11">
    <div className="main-content1">
        <div className="left box1">
            <h2>About us</h2>
            <div className="content1">
              HRMS empowers businesses with AI, streamlining HR processes for efficient management. Elevate success with advanced tools, from recruitment to performance management.
                <div className="social">
                    <a href="https://www.facebook.com/profile.php?id=61558865784354"><FontAwesomeIcon icon={faFacebook} className='fas'/></a>
                    <a href="https://twitter.com/HBotix13985"><FontAwesomeIcon icon={faTwitter} className='fas'/></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} className='fas'/></a>
                    <a href="https://www.youtube.com/channel/UCrEDZ1Cx6qj-wHDTGei2tbA"> <FontAwesomeIcon icon={faYoutube} className='fas'/></a>
                </div>
            </div>
        </div>
        <div className="center box1">
          <h2>Address</h2>
          <div className="content1">
              <div className="place">
              <CiLocationOn icon={ CiLocationOn } className='fas'/>
                  <span className="text1">Assuit&Sohag, Egypt</span>
              </div>
              <div className="phone">
              <CiPhone  icon={ CiPhone  } className='fas'/>
                  <span className="text1">+201033239589</span>
              </div>
              <div className="email">
              <CiMail  icon={ CiMail  } className='fas'/>
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
                      <input type="email" required/>
                  </div>
                  <div className="msg">
                      <div className="text1">Messsage *</div>
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









    </div>
  );
};

export default UserSearch;