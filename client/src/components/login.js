import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';

function login(props) {

    useEffect(() => {
        document.title = "VALORGG - Login";
      }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formErrMsg = React.useRef(null);

    const changePage = () => {

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

        if (username == "" || password == "")
        {
            return;
        }

        else 
        {
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
            .then( response =>
                {
                    if (response.status == 404)
                    {
                        throw new Error("Username or password is incorrect.");
                    }
                    return response.json();
                } )

            .then( (data) => {
                getUser(data);
                updateLogin();
                goDash();

            }, (error) => {
                console.log(error);
                formErrMsg.current.innerHTML = "Username or password is incorrect.";
            })
    }

    const handleKeyDown = (e) => {
            
        if (e.key === 'Enter')
        {
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

        <div className="d-flex flex-column text-light justify-content-center align-items-center border border-dark rounded p-5 bg-dark">
            <h1 className="h1"> Login </h1>
            <form>

                <div className="form-group m-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" onChange={ handleUser } onKeyUp={ handleKeyDown }></input>
                </div>

                <div className="form-group m-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={ handlePass } onKeyUp={ handleKeyDown }></input>
                </div>

                <div className="d-flex flex-column justify-content-center">

                    <button type="button" className="btn btn-danger m-3" onClick={ loginPressed }>
                        Login
                    </button>

                    <p ref={ formErrMsg } className="text-danger text-center"></p>

                    <a href="#" onClick={ changePage } className="text-primary py-4 text-center">Don't have an account? Sign up here</a>
                </div>

            </form>
        </div>

    )
}

export default login;