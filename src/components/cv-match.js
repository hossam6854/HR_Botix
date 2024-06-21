
import './home/css/bootstrap.min.css'
import './home/css/unicons.css'
import './cv-review/css/style.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
import { CiLocationOn,CiMail,CiPhone,CiChat1,CiCloud } from "react-icons/ci";
import { FaBolt } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { LuPalette } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import {Link} from 'react-router-dom'


import React, { useEffect, useState } from 'react';




function Cvmatch() {


  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);

  /**
   * Everytime checked changes, update the property data-theme in the
   * HTML so it uses the theme we have in localStorage
   */
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



  const [fileName, setFileName] = useState('Select file..');
  const [cv, setData] = useState({ 'fileName': '', 'jd': '' });
  const [ProfileData, setProfileData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setData({...cv, fileName: selectedFile});
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile.type.startsWith('image')) {
        setFileName(`${selectedFile.name}`);
      } else if (selectedFile.type === 'application/pdf') {
        setFileName(`${selectedFile.name}`);
      } else {
        setFileName(selectedFile.name);
      }
    } else {
      setFileName('Select file..');
    }
  };

function submitFile() {
  const formData = new FormData();
  if(!fileName || !cv.jd) {
    return false;
  }
  formData.append('cv', cv.fileName);
  formData.append('jd', cv.jd); 
  fetch('http://localhost:6120/match', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProfileData(data);
    });
}

  

  return (


<div classNameName='cvreview'>
  
  <nav className="navbar navbar-expand-sm navbar-light">
    <div className="container">
        <a className="navbar-brand" href=""><i className='uil uil-user'></i> hi HR!</a>

        

        <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to="/homehr" className="nav-link"><span data-hover="Home">Home</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link" id="acctive"><span data-hover="Jobs">Match cv</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/creartcvhr" className="nav-link"><span data-hover="CVs">Create CV</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/searchUserhr" className="nav-link"><span data-hover="Review">job seekers search</span></Link>
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








  <section className='cvreview11'>
    <div className="main-text112">Let your CV stand out from the crowd!</div>
    
    <ul className="boxes wide">
  <li className="horizontal">
    <div className="rounded-icon">
      <CiChat1 icon={CiChat1} className='fassa' />
    </div>
    <div className="text">
      <h5>Upload CV</h5>
      <div>Upload your CV in PDF format to start the matching process.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <IoMdCheckmark icon={IoMdCheckmark} className='fassa' />
    </div>
    <div className="text">
      <h5>Enter Job Description</h5>
      <div>Provide the job description text to compare against your CV.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <LuPalette icon={LuPalette} className='fassa' />
    </div>
    <div className="text">
      <h5>Matching Ratio</h5>
      <div>Receive a matching ratio that indicates how well your CV fits the job post.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <GrLanguage icon={GrLanguage} className='fassa' />
    </div>
    <div className="text">
      <h5>Detailed Analysis</h5>
      <div>Get a detailed analysis of your CV against the job description to understand areas of improvement.</div>
    </div>
  </li>
</ul>

    <form action="" method="post" enctype="multipart/form-data">
    <div className="upload">
      <input type="button" className="uploadButton" value="Browse" />
      <input
        type="file"
        name="upload"
        accept="image/*, .pdf"
        id="fileUpload"
        onChange={handleFileChange}
      />
      <span className="fileName">{fileName}</span>
    </div>
  </form>
  <div className="jobDescription">
    <label for="jobDescription">add Job Description</label>
    <textarea name="jobDescription" id="jobDescription" rows="4" cols="50"
    onChange={(e) => setData({...cv, jd: e.target.value})}
    value={cv.jd}
    ></textarea>
  </div>
  <input type="button" onClick={submitFile} className="uploadButton" value="Upload File" />

  </section>

  {ProfileData && (
      <div className='pader'>
        <h2>Profile Matching</h2>
        <div className='matchingg-container'>
          <div className='matchingg'>
            {ProfileData.similarity}%
          </div>
        </div>
      </div>
)}











  
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

export default Cvmatch;