


  import './home/css/bootstrap.min.css'
  import './home/css/unicons.css'
  import './cv-review/css/style.css'
  import './ProfileCard.css'
  
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
  import { CiLocationOn,CiMail,CiPhone,CiChat1 } from "react-icons/ci";
  import { GrLanguage } from "react-icons/gr";
  import { LuPalette } from "react-icons/lu";
  import { IoMdCheckmark } from "react-icons/io";
  import {Link} from 'react-router-dom'
  import ProfileCard from './profileCard';


  import React, { useEffect, useState } from 'react';




  function Cvreview() {


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
    const [file, setFile] = useState({ 'fileName': '' });
    const [ProfileData, setProfileData] = useState(null);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile({...file, fileName: selectedFile});
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
    if(!file) {
      return false;
    }
    formData.append('resume', file.fileName);
    fetch('http://localhost:5000/pred', {
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
                    <Link to="" className="nav-link" id="acctive"><span data-hover="Review">CV Review</span></Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/calendar" className="nav-link"><span data-hover="Meeting">Meeting scheduling</span></Link>
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
      <h5>Extract Information</h5>
      <div>Our tool scans your PDF CV and extracts key information such as contact details, education, and work experience.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <IoMdCheckmark icon={IoMdCheckmark} className='fassa' />
    </div>
    <div className="text">
      <h5>Recommend Jobs</h5>
      <div>Based on the extracted information, get job recommendations that match your profile and skills.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <LuPalette icon={LuPalette} className='fassa' />
    </div>
    <div className="text">
      <h5>Detect CV Category</h5>
      <div>Identify the category of your CV, whether it's for a technical role, managerial position, or other fields.</div>
    </div>
  </li>
  <li className="horizontal">
    <div className="rounded-icon">
      <GrLanguage icon={GrLanguage} className='fassa' />
    </div>
    <div className="text">
      <h5>Extract Skills</h5>
      <div>Automatically generate a list of your skills from your CV to ensure they are highlighted effectively.</div>
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
      <input type="button" onClick={submitFile} className="uploadButton" value="Upload File" />
    </form>
    </section>

    {ProfileData && <ProfileCard profileData={ProfileData} />}












    
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
                      <button type="submit" >Send</button>
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

export default Cvreview;