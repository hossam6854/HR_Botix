import {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import './assets/css/LOG.css'
import { Business } from "@material-ui/icons";

function Log() {

    const [dataa, setData] = useState({
        userName: '',
        email: '',
        password: '',
        gender: '',
        firstName: '',
        lastName: '',
        phone: '',
        accountType: '',
        jobSpeciality: '',
        ConfirmPassword: ''
    });

    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState('signup');
    

    function validatePass() {
      if(dataa.ConfirmPassword === undefined || dataa.ConfirmPassword !== dataa.password) {
        setMessage('Password not matched');
        console.log('validate password')
        return false;
      }
      else {
        setMessage('');
        return true
      }
    }
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function ValidateData() {
        if(dataa.userName === '' || dataa.password === '' || dataa.phone === '' || dataa.ConfirmPassword === '' || dataa.email === '') {
          setMessage('Please make sure to fill all fields');
          console.log(dataa)
          return false
        }
        else if(dataa.phone.length < 10 || dataa.phone.length >= 12)
          {
            setMessage('Enter a valid phone number');
            return false;
          }
        else if(!validateEmail(dataa.email)) {
          setMessage('Enter a valid E-mail');
          return false;
        }
        else if(dataa.password.length < 10) {
          setMessage('Password is weak');
          return false;
        }
        return true;
      }


    const handleChange = (e) => {
        setData({
            ...dataa,
            [e.target.name]: e.target.value
        });
    };

    const signup = async () => {
        let {
          userName,
          email,
          password,
          gender,
          firstName,
          lastName,
          phone,
          accountType,
          jobSpeciality } = dataa;
          if(validatePass() && ValidateData()) {
            // pass
          }
          else {
            console.log(dataa.ConfirmPassword, dataa.password)
            return;
          }
          if(accountType === ""){
            accountType='Job seeker'
            console.log(accountType)
          }

        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName,
            email,
            password,
            gender,
            firstName,
            lastName,
            phone,
            accountType,
            jobSpeciality
          })
        });
    
        const data = await response.json();
        console.log(data);

        if(data['token']) {
            setActiveTab('login');
            document.getElementById("login-tab").click();
        }
    };
    
    const login = async () => {
        const { userName, password } = dataa;
        console.log(dataa)
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName, // send username as email
            password
          })
        });
    
        const data = await response.json();
        console.log(data);

        if(data['token'])
        {
          if(data['user'].firstName) {
            localStorage.setItem('firstName', data['user'].firstName);
          }
          localStorage.setItem('token', data['token']);
          if(data['accountType'] === 'Businessman') {
            window.location.href = '/homebusinessman';
          }
          else if(data['accountType'] === 'Job seeker') {
            window.location.href = '/home';
          }
          else if(data['accountType'] === 'HR') {
            window.location.href = '/homehr';
          }
        }
        else {
            setMessage(data['message']);
        }
    };
  

  return (
    <div className="log">
      <div className="container register" id="Login">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src="./assets/logo.png" alt="" />
            <h3>Welcome</h3>
          </div>

          <div className="col-md-9 register-right">
            <ul
              className="nav nav-tabs1 nav-justified"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "signup" ? "active" : ""
                  }`}
                  id="signup-tab"
                  data-toggle="tab"
                  href="#signup"
                  role="tab"
                  aria-controls="signup"
                  aria-selected="true"
                >
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "login" ? "active" : ""
                  }`}
                  id="login-tab"
                  data-toggle="tab"
                  href="#login"
                  role="tab"
                  aria-controls="login"
                  aria-selected="false"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="forget-tab"
                  data-toggle="tab"
                  href="#forget"
                  role="tab"
                  aria-controls="forget"
                  aria-selected="false"
                >
                  Forget
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="signup"
                role="tabpanel"
                aria-labelledby="signup-tab"
              >
                <ul
                  className="nav nav-tabs nav-justified"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="jobseeker-tab"
                      data-toggle="tab"
                      href="#jobseeker"
                      role="tab"
                      aria-controls="jobseeker"
                      aria-selected="true"
                      onClick={() => {
                        setData({
                          ...dataa,
                          accountType: 'Job seeker'
                        });
                        console.log(dataa.accountType);
                      }}
                    >
                      Job seeker
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="Businessman-tab"
                      data-toggle="tab"
                      href="#Businessman"
                      role="tab"
                      aria-controls="Businessman"
                      aria-selected="false"
                      onClick={() => {
                        setData({
                          ...dataa,
                          accountType: 'Businessman'
                        });
                        console.log(dataa.accountType)
                      }}
                    >
                      Businessman
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="HR-tab"
                      data-toggle="tab"
                      href="#HR"
                      role="tab"
                      aria-controls="HR"
                      aria-selected="false"
                      onClick={() => {
                        setData({
                          ...dataa,
                          accountType: 'HR'
                        });
                        console.log(dataa.accountType)
                      }}
                    >
                      HR
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="jobseeker"
                    role="tabpanel"
                    aria-labelledby="jobseeker-tab"
                  >
                    <h3 className="register-heading">Apply as a Job seeker</h3>
                    <div className="row register-form">
                      <div className="col-md-6">




                      <div className="form-group">
                          <input
                            value={dataa.userName}
                            onChange={handleChange}
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="User Name *"
                          />
                        </div>




                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            value={dataa.firstName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="First Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="lastName"
                            value={dataa.lastName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Last Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            value={dataa.password}
                            name="password"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Password *"
                          />
                        </div>
                        
                        <div className="form-group">
                          <div className="maxl">
                            <label className="radio inline">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleChange}
                              />
                              <span> Male </span>
                            </label>
                            <label className="radio inline">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}
                              />
                              <span>Female </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="ConfirmPassword"
                            value={dataa.ConfirmPassword}
                            placeholder="Confirm Password *"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            value={dataa.email}
                            onChange={handleChange}
                            name="email"
                            className="form-control"
                            placeholder="Your Email *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            value={dataa.phone}
                            onChange={handleChange}
                            minlength="10"
                            maxlength="11"
                            name="phone"
                            className="form-control"
                            placeholder="Your Phone *"
                          />
                        </div>
                        <div className="form-group">
                          <select className="form-control" name="jobSpeciality" value={dataa.jobSpeciality} onChange={
                            (evt) => {
                              setData({
                                ...dataa,
                                jobSpeciality: evt.target.value
                              });
                            }
                          }>
                            <option className="hidden" selected disabled>
                            What is your job specialty?
                            </option>
                            <option> IT/Software Development</option>
                            <option>cybersecurity</option>
                            <option>Software Engineering</option>
                            <option>Artificial intelligence</option>
                            <option>Programmer</option>
                            <option>Information Technology</option>
                            <option>Game design</option>
                            <option>Information Systems Engineering</option>
                            <option>Database Administrator</option>
                            <option>Computer Science</option>

                          </select>
                        </div>
                        <Link
                          onClick={signup}
                          className="btnRegister"
                        >
                          Sign up Now
                        </Link>
                      </div>
                    </div>
                    {message && <div>{message}</div>}
                  </div>

                  <div
                    className="tab-pane fade show"
                    id="Businessman"
                    role="tabpanel"
                    aria-labelledby="Businessman-tab"
                  >
                    <h3 className="register-heading">Apply as a Businessman</h3>
                    <div className="row register-form">
                      <div className="col-md-6">


                      <div className="form-group">
                          <input
                            value={dataa.userName}
                            onChange={handleChange}
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="User Name *"
                          />
                        </div>



                        <div className="form-group">
                          <input
                            type="text"
                            onChange={handleChange}
                            value={dataa.firstName}
                            name="firstName"
                            className="form-control"
                            placeholder="First Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            onChange={handleChange}
                            value={dataa.lastName}
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            value={dataa.email}
                            name="email"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Email *"
                          />
                        </div>
                        
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                          <input
                            type="text"
                            value={dataa.phone}
                            onChange={handleChange}
                            name="phone"
                            maxlength="10"
                            minlength="10"
                            className="form-control"
                            placeholder="Phone *"
                          />
                        </div>
                        <div className="form-group">
                        <input
                            type="password"
                            value={dataa.password}
                            name="password"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Password *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="ConfirmPassword"
                            value={dataa.ConfirmPassword}
                            placeholder="Confirm Password *"
                            onChange={handleChange}
                          />
                        </div>
                        <input
                          type="submit"
                          onClick={signup}
                          className="btnRegister"
                          value="Sign Up"
                        />
                      </div>
                    </div>
                    {message && <div>{message}</div>}
                  </div>

                  <div
                    className="tab-pane fade show"
                    id="HR"
                    role="tabpanel"
                    aria-labelledby="HR-tab"
                  >
                    <h3 className="register-heading">Apply as a HR</h3>
                    <div className="row register-form">
                      <div className="col-md-6">

                      <div className="form-group">
                          <input
                            value={dataa.userName}
                            onChange={handleChange}
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="User Name *"
                          />
                        </div>




                        
                        <div className="form-group">
                          <input
                            type="text"
                            onChange={handleChange}
                            value={dataa.firstName}
                            name="firstName"
                            className="form-control"
                            placeholder="First Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            onChange={handleChange}
                            value={dataa.lastName}
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name *"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            value={dataa.email}
                            onChange={handleChange}
                            name="email"
                            className="form-control"
                            placeholder="Your Email *"
                          />
                        </div>

                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            maxlength="11"
                            minlength="10"
                            className="form-control"
                            placeholder="Phone *"
                            name="phone"
                            value={dataa.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password *"
                            name="password"
                            value={dataa.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="ConfirmPassword"
                            value={dataa.ConfirmPassword}
                            placeholder="Confirm Password *"
                            onChange={handleChange}
                          />
                        </div>
                       
                        <input
                          type="submit"
                          onClick={signup}
                          className="btnRegister"
                          value="Sign Up"
                        />
                      </div>
                    </div>
                    {message && <div>{message}</div>}
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade show"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <h3 className="register-heading">Login page</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="userName"
                        value={dataa.userName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="userName *"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        value={dataa.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Password *"
                      />
                    </div>

                    <input
                      type="submit"
                      onClick={login}
                      className="btnRegister"
                      value="Login"
                    />
                   
                  </div>
                  <div>{message}</div>
                </div>
              </div>

              <div
                className="tab-pane fade show"
                id="forget"
                role="tabpanel"
                aria-labelledby="forget-tab"
              >
                <h3 className="register-heading">Forget page</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Last password *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New password *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password *"
                        name="ConfirmPassword"
                        value={dataa.ConfirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      type="submit"
                      className="btnRegister"
                      value="change password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
