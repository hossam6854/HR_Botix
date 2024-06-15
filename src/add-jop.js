import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import './components/assets/css/addjop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
import { CiLocationOn,CiMail,CiPhone } from "react-icons/ci";


function AddJob() {
    const [skills, setSkills] = useState(['']);
    const [job, setJob] = useState({
      jobTitle: '',
      company: '',
      email: '',
      jobType: '',
    });

    function handleChange(evt) {
      const value = evt.target.value;
      setJob({
        ...job,
        [evt.target.name]: value,
      });
    }

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleDeleteSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
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

    function createNewJob() {
      fetch('http://localhost:3000/jobAdd', {
        method: 'POST',
        headers: {
          'token': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...job, skills: skills.join(' ')}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      console.log({...job, skills : skills.join(' ')})
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
                      <Link to="" className="nav-link" id="acctive"><span data-hover="Jops">add Jop</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/searchUser" className="nav-link"><span data-hover="Review">Find a employee</span></Link>
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









        
      <div className="container">
        <div className="form-group123">
          <input
            type="text"
            name="jobTitle"
            className="input-field"
            placeholder="Job Title*"
            onChange={handleChange}
            value={job.jobTitle}
          />
        </div>
  
        <div className="form-group123">
          <input
            type="text"
            name="company"
            className="input-field"
            placeholder="Company Name*"
            onChange={handleChange}
            value={job.company}
          />
        </div>
  
        <div className="form-group123">
          <input
            type="mail"
            name="email"
            className="input-field"
            placeholder="Email*"
            onChange={handleChange}
            value={job.email}
          />
        </div>
  
        <div className="form-group123">
          <select
            className="select-field"
            value={job.jobType}
            onChange={(e) => setJob({ ...job, jobType: e.target.value })}
          >
            <option value="" disabled>Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
  
        {skills.map((skill, index) => (
        <div key={index} className="form-group123">
          <input
            type="text"
            name={`skill-${index}`}
            className="input-field"
            placeholder="Skill*"
            value={skill}
            onChange={(event) => handleSkillChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleDeleteSkill(index)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddSkill} className="button">
        Add Skill
      </button>
    </div>
    <button type="button" className="button123" onClick={createNewJob}>
        search for candidate 
      </button>

      <div className='padddd'></div>













         
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
  }
  
  export default AddJob;