import { Link } from "react-router-dom";

import myImage from './home/images/undraw/undraw_software_engineer_lvl5.svg';
import './home/css/style.css'

import React, { useEffect, useState } from 'react';


  function Home() {

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
  <div className='home'>
  
  <div>

    <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
            <a className="navbar-brand" href=""><i className='uil uil-user'></i>Hi Businessman!</a>

            
                 
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to="" className="nav-link" id="acctive"><span data-hover="Home">Home</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/addjob" className="nav-link"><span data-hover="Jobs">add Job</span></Link>
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


    





    <section className="about full-screen d-lg-flex justify-content-center align-items-center" id="about">
        <div className="container">
            <div className="row">
                
                <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                    <div className="about-text">
                        <small className="small-text111">Welcome to <span className="mobile-block">HRBOTIX website!</span></small>
                        <h1 className="animated animated-text">
                            <span className="lier">Hey {localStorage.getItem("firstName") ? `${localStorage.getItem("firstName")}` : "folks"}, happy to help you to</span>
                                <div className="animated-info">
                                    <span className="animated-item">Find a Employee</span>
                                    <span className="animated-item">add jobs</span>
                                </div>
                        </h1>

                        <p>Create a Attractive CV is a challenge. We are very active in creating and designing CVs and recruiting job seekers</p>
                        
                        <div className="custom-btn-group mt-4">
                          <a href="/searchUser" className="btn custom-btn custom-btn-bg custom-btn-link">Find a employee</a>
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

    



    



  </div>
  </div>
);
}

export default Home;