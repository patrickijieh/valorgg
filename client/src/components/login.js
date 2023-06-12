import React, { useState, useEffect } from 'react';
import '../App.css';

function login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formErrMsg = React.useRef(null);
  
  useEffect(() => {
    document.title = "VALORGG - Login";
  }, []);
  
  const changePage = (event) => {
    event.preventDefault();
    updateLogin();
    updateRegister();
  }
  
  const handleUser = (e) => {
    setUsername(e.target.value);
    formErrMsg.current.innerHTML = "";
  }
  
  const handlePass = (e) => {
    setPassword(e.target.value);
    formErrMsg.current.innerHTML = "";
  }
  
  const loginPressed = () => {
    if (username == "" || password == "") {
      return;
    } else {
      loginUser();
    }
  }

  const getUser = (userData) => {
    props.getUser(userData);
  }
  
  const loginUser = async () => {
    let fetchurl = "/users/from-login/";
    fetchurl += username + "/" + password;

    fetch(fetchurl)
    .then(response => {
      if (response.status == 404) {
        throw new Error("Username or password is incorrect.");
      }
      return response.json();
    })
    .then((data) => {
      getUser(data);
      updateLogin();
      goDash();
    })
    .catch((err) => {
      console.error(err);
      formErrMsg.current.innerHTML = "Username or password is incorrect.";
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    loginPressed();
    }
  }

  const goDash = () => {
    props.goDash(true);
  }

  const updateLogin = () => {
    props.updateLogin(false);
  }

  const updateRegister = () => {
    props.updateRegister(true);
  }

  return (
    <div className="d-flex flex-column text-light justify-content-center align-items-center p-5 bg-dark w-100">
      <h1 className="h1 text-center">Login</h1>
      <form className="user-form">

        <div className="form-group m-3">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" onChange={ handleUser } onKeyUp={ handleKeyDown }></input>
        </div>

        <div className="py-2"></div>

        <div className="form-group m-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={ handlePass } onKeyUp={ handleKeyDown }></input>
        </div>

        <div className="py-2"></div>

        <div className="d-flex flex-column justify-content-center">
          <button type="button" className="btn btn-outline-danger m-3" onClick={ loginPressed }>
            Login
          </button>
          <div ref={ formErrMsg } className="text-danger text-center"></div>
          <a href="" onClick={ changePage } className="text-primary py-4 text-center">Don't have an account? Sign up here</a>
        </div>
        
      </form>
    </div>
  );
}

export default login;