import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {templateImagesPaths} from '../Data/Data'
import { useDispatch } from 'react-redux'
import {updateState} from '../../ReduxManager/dataStoreSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";
import { CiLocationOn,CiMail,CiPhone } from "react-icons/ci";
import './homeee.css';




const shortid= require('shortid')


function Homeee() {
    const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver')
    
    const dispatch = useDispatch();

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


        <div style={{minWidth:'300px'}}>
            <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
            <a className="navbar-brand" href=""><i className='uil uil-user'></i> HRBOTIX</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
            </button>

                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" ><span data-hover="Home">Home</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/search" className="nav-link"><span data-hover="Jops">Find Jop</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link" id="acctive"><span data-hover="CVs">Create CV</span></Link>
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
                        <input type="checkbox"    defaultChecked={checked}   onChange={() => toggleThemeChange()}  id="themeToggle" />
                        <label htmlFor="themeToggle"></label>
                        <span className="color-mode-text">Color Mode</span>
                       </div>
                      </div>
                    </div>
                </ul>
            </div>
    </nav>

    
            <div className='d-flex justify-content-center mt-5' >
                
                <h3 className='main-text1122'>Select a Template to get started!</h3>
            </div>
           

            <div className='container' style={{color:'#1f4287',}}>

                <div className='row'>
                    {templateImagesPaths.map((currentTemplate)=>{
                            return(
                                <div className='col col-lg-3 col-md-6  col-12 mt-5' key={shortid.generate()}>
                                    <div 
                                        style= {{ position:'relative'}}
                                        onMouseOver= {()=>{
                                            //this function allows us to display 'Use Template'button on the top of the targeted template, when the user hovers over it by setting state's value to the targeted template name.//
                                            setIsMouseOver(currentTemplate.name)
                                        }}
                                        onMouseOut= {()=>{
                                            //this function allows us to hide 'Use Template' button when the user moves out from the particular template//
                                            setIsMouseOver('MouseIsNotOver')
                                        }}
                                    >
                                    <div className='w-100 d-flex justify-content-center'><h3>{currentTemplate.name}</h3></div>
                                    <img className="w-100 image-aspect-ratio" src={currentTemplate.imageSource} alt='template'/>
                                    {isMouseOver === currentTemplate.name           //this conditional rendering is showing 'useTemplate' button when isMouseOver === currentTemplate.name //
                                        ?<Link to="/detailsfillingpage/personalinfo">
                                            <button className='btn btn-primary'
                                                    style={{position: 'absolute',top:'50%' , right:'30%',}}
                                                    onClick= {()=>{
                                                        dispatch(updateState({  //this dispatch function is used to update value of 'selectedTemplate' with the targetedTemplate in dataStoreSlice.js//
                                                        key: 'selectedTemplate',
                                                        value:currentTemplate.name
                                                        }))
                                                    }}
                                            >
                                            Use Template
                                            </button>
                                        </Link>
                                        :null
                                    }
                                </div>
                                </div>
                                
                            )
                        })}
                </div>
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



        
    )
}

export default Homeee
