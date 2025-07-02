import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo.png'
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../constant/API_Settings";
import { Alert } from 'react-bootstrap'

export default function LoginComponent() {
  const navigate = useNavigate();
  const [loginFailed,setLoginFailed] = useState(false)

  const [login_details,setlogin_details]=useState({
     email:"",
     password:"",
 });
 const [tokens,settokens]=useState({

 })

 useEffect(() =>
   {
      
     document.title = "Login"
     if(localStorage.getItem("TOKEN")!=="undefined" &&  localStorage.getItem("TOKEN")!==null && localStorage.getItem("TOKEN")!=="")
     {
      navigate('/home');
     }
   })

   const handleSubmit = (event) =>
  {
    event.preventDefault()
    sendLoginDetails()
  }
 
 
   function sendLoginDetails()
  {
    setLoginFailed(false)
     const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' },
        body: JSON.stringify(login_details)
    };

     fetch(API_URL+"/login",requestOptions)
            .then(response => response.json())
            .then(result => {
              let token = result.success.token
              var permission=result.permissions
              if(token!=="undefined" && token!==null && token!=="")
              {
                setLoginFailed(false)
                
                localStorage.setItem("AUTH_TOKEN",token)
                localStorage.setItem("ROLE_ID",result.role_id)
                // localStorage.setItem("Permissions",JSON.stringify(permission))
                if(result.role_id!=="3")
                {
                  navigate('/home');
                }
                if(result.role_id=="3")
                {
                  navigate('/32io_test');
                }
               
              }
              else
              {
               setLoginFailed(true) 
              }
            })
            .catch(e => {
              setLoginFailed(true)
                console.log(e);
                
            });
  }
 

  const handleInputs = e => {
   setlogin_details({
     ...login_details,
     [e.target.name]: e.target.value
   });

}


  return (
    <div className="bg-white">
      <div className="container-fluid pl-0 pr-3">
        <div className="row">
          <div className="col-md-4 pr-md-0">
            {/* <div className="log-right"> */}
              {/* <div className="right-wraper"> */}
                {/* <img src={login} className="img-fluid" /> */}
                {/* <h2 className="text-dark font-weight-bolder pt-4">
                  Go For The Smartest <br />
                  <span>Lighting Solution</span>
                </h2> */}
              {/* </div> */}
            {/* </div> */}
          </div>
          <div className="col-md-4  border mt-5 pb-4 rounded">
            <div className="log-left">
              <div className="text-center">
                {/* <img src={logo} height="55px" /> */}
                <h3>Login</h3>
              </div>
              <form noValidate onSubmit={handleSubmit} 
            //   noValidate onSubmit={handleSubmit}
              >
                 { loginFailed?<Alert  variant="danger" severity="error">Invalid Login Credentials</Alert>:""}
                <div className="form-group">
                  <label for="uname">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={login_details.email}
                    onChange={handleInputs}
                  />
                </div>
                <div className="form-group">
                  <label for="Password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={login_details.password}
                    onChange={handleInputs}
                  />
                </div>
                {/* <Link to="/forgotpassword" className="float-right mb-3">
                  Forgot Password?
                </Link> */}
                <button type="submit" className="btn btn-block btn-info">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
