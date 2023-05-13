import React, { useState, useEffect } from 'react';

function signup(props) {

    useEffect(() => {
        document.title = "VALORGG - Register";
      }, []);

    const [enteredUser, setEnteredUser] = useState("");

    const [enteredPass, setEnteredPass] = useState("");

    const [enteredPassConfirm, setEnteredPassCofirm] = useState("");

    const userErrMsg = React.useRef(null);
    const passErrMsg = React.useRef(null);
    const passConfirmErrMsg = React.useRef(null);
    const formErrMsg = React.useRef(null);

    const changePage = () => {

        updateRegister();
        updateLogin();

    }

    const handleUser = (e) => {

        setEnteredUser(e.target.value);
        userErrMsg.current.innerHTML = "";

    }

    const handlePass = (e) => {

        setEnteredPass(e.target.value);
        passErrMsg.current.innerHTML = "";
        passConfirmErrMsg.current.innerHTML = "";

    }

    const handlePassConfirm = (e) => {

        setEnteredPassCofirm(e.target.value);
        passErrMsg.current.innerHTML = "";
        passConfirmErrMsg.current.innerHTML = "";

    }

    const getUser = (userData) => {
        props.getUser(userData);
    }

    const signUpPressed = () => {

        if(enteredUser == "test")
        {
            createUser();
        }

        if (enteredUser == "" || enteredPass == "" || enteredPassConfirm == "")
        {
            formErrMsg.current.innerHTML = "Please fill out all fields!";
        }

        else if (enteredUser.length < 4 || enteredUser.length > 15 || enteredPass.length < 6 || enteredPass != enteredPassConfirm || enteredUser.includes(" "))
        {
            if  (enteredUser.length < 4 || enteredUser.length > 15)
            {
                userErrMsg.current.innerHTML = "Username must be 4-15 characters!";
                formErrMsg.current.innerHTML = "Please fix all errors before submitting.";
            }

            if (enteredUser.includes(" ")) 
            {
                userErrMsg.current.innerHTML = "Username cannot contain spaces!";
                formErrMsg.current.innerHTML = "Please fix all errors before submitting.";
            }

            if (enteredPass.length < 6)
            {
                passErrMsg.current.innerHTML = "Password must have at least 6 characters!";
                formErrMsg.current.innerHTML = "Please fix all errors before submitting.";
            }

            if (enteredPass != enteredPassConfirm)
            {
                passConfirmErrMsg.current.innerHTML = "Passwords do not match!";
                formErrMsg.current.innerHTML = "Please fix all errors before submitting.";
            }
        }

        else {
            createUser();
        }

    }

    const createUser = async () => {

        const requestData = 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: enteredUser, password: enteredPass})
        }

        fetch('/users/from-login/', requestData)
            .then( response => {
                if (!response.ok)
                {
                    throw new Error("Username already exists!");
                }
                return response.json();

            }, (err) => {
                console.log(err);
            })
            .then( (data) => {
                getUser(data);
                updateRegister();
                goDash();

            }, (err) => {
                formErrMsg.current.innerHTML = "Username already exists!";
                userErrMsg.current.innerHTML = "Username is currently in use!";
            });
    }

    const updateLogin = () => {

        props.updateLogin(true);

    }

    const updateRegister = () => {

        props.updateRegister(false);

    }

    const goDash = () => {
            
        props.goDash(true);

    }

    return (

        <div className="d-flex flex-column text-light justify-content-center align-items-center border border-dark rounded p-5 bg-dark">
            <h1 className="h1 px-5">Create Account</h1>
            <form className="w-100">

                <div className="form-group m-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" onChange={handleUser}></input>
                </div>

                <p ref={ userErrMsg } className="text-danger text-center py-2 text-wrap mw-100"></p>

                <div className="form-group m-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handlePass}></input>
                </div>
                <p ref={ passErrMsg } className="text-danger text-center py-2 text-wrap"></p>
                <div className="form-group m-3">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirm" placeholder="Confirm Password" onChange={handlePassConfirm}></input>
                </div>
                <p ref={ passConfirmErrMsg } className="text-danger text-center py-2 text-wrap"></p>

                <div className="d-flex flex-column justify-content-center">
                    <button type="button" onClick={signUpPressed} className="btn btn-danger m-3">
                        Sign Up!
                    </button>

                    <p ref={formErrMsg} className="text-danger text-center"></p>

                    <a href="#" onClick= {changePage} className="text-primary py-4 text-center">Already have an account? Log in here</a>
                </div>

            </form>
        </div>

    );
}

export default signup;