import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login.js';
import Register from './components/signup.js';
import Dashboard from './components/dashboard/dashboard.js';
import logo from './assets/valorantgg icon.png';

function App() {
  const [doLogin, setLogin] = useState(false);
  const [doRegister, setRegister] = useState(false);
  const [doDash, setDash] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData)
    {
      console.log(userData.username);
    }
  }, [userData]);

  const pressLogin = () => {
    setLogin(true);
  }

  const pressRegister = () => {
    setRegister(true);
  }

  const pressDashboard = (event) => {
    event.preventDefault();
    if (!userData)
    {
      alert("You must be logged in to access the dashboard.");
      return;
    }
    setLogin(false);
    setRegister(false);
    setDash(true);
  }

  const updateLogin = (boolLogin) => {
    setLogin(boolLogin);
  }

  const updateRegister = (boolRegister) => {
    setRegister(boolRegister);
  }

  const goDash = (boolDash) => {
    setDash(boolDash);
  }

  const pressHome = (event) => {
    event.preventDefault();
    setLogin(false);
    setRegister(false);
    setDash(false);

    document.title = "VALORGG";
  }

  const pressLogout = (event) => {
    event.preventDefault();
    setUserData(null);
    location.reload();
  }

  const getUser = (user) => {
    setUserData(user);
  }

  const updateUserData = (data) => {
    setUserData(data);
}

  return (
    /* APP BACKGROUND & NAVBAR */
    <div className="d-flex flex-row">

      <div className="App-bg"></div>

      <div className="App bg-dark border border-dark h-100">
        <div className="d-flex flex-column text-light">

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 fixed-top">

            <a className="navbar-brand px-1" href="" onClick={pressHome}>VALORGG</a>

            <ul className="navbar-nav px-1">
              <li className="nav-item active">
                <a className="nav-link" href="" onClick={pressHome}>Home</a>
              </li>
            </ul>

            <ul className="navbar-nav px-1">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={pressDashboard}>Dashboard</a>
              </li>
            </ul>

            <ul className="navbar-nav px-1 mr-auto flex-fill">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={pressHome}>Search</a>
              </li>
            </ul>

            {/* LOGOUT BUTTON (only appears if user is logged in)*/}

            {
              userData ? (
              <ul className="navbar-nav">
                <li className="nav-item justify-content-end">
                  <div className="d-flex flex-row flex-fill">
                    <span className="nav-link active px-2">{userData.username}</span>
                    <a className="nav-link px-1" href="" onClick={pressLogout}>Logout</a>
                  </div>
              </li>
              </ul>) : (false)
            }

          </nav>
        {/* APP CONTENT (main div)*/}
        <div className="App-contents d-flex flex-column justify-content-center align-items-center flex-fill">
          { !doLogin ? (
              !doRegister ? (
                !doDash ? (

                /* HOME PAGE */
                <div className="d-flex flex-column text-light justify-content-center align-items-center p-5 bg-dark h-100">
                  <h1 className="h2">VALORGG</h1>
                  <h3 className="text-center h6 py-4">Track the Competitive match history of any Valorant account</h3>
                  <img src={logo} className="img-fluid w-50 h-50" alt="ValorGG Logo"/>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-outline-danger px-5 m-3 text-center w-100" onClick={pressLogin}>
                      Login
                    </button>
                    <button className="btn btn-outline-danger px-5 m-3 text-center w-100" onClick={pressRegister}>
                      Sign Up
                    </button>
                  </div>
                </div>
                
                ) : ( 
                  /* DASHBOARD PAGE */
                <Dashboard userData={userData} updateUserData={updateUserData} goDash={goDash}/>
                )) : ( 
                /* REGISTER PAGE */
                <Register updateRegister={updateRegister} updateLogin={updateLogin} goDash={goDash} getUser={getUser}/>
                )) : (
                /* LOGIN PAGE */
                <Login updateLogin={updateLogin} updateRegister={updateRegister} goDash={goDash} getUser={getUser}/>)
          }
        </div>

          {/* APP FOOTER */}
          <footer className="d-flex flex-fill flex-row bg-dark text-light fixed-bottom p-3">
            <div>
              <a href="https://github.com/patrickijieh/valorgg" target="_blank" className="h5 text-primary px-2">GitHub</a>
            </div>
            <div className="px-2">
              Copyright &copy; Patrick Ijieh 2023
            </div>
          </footer>
        </div>
      </div>

      <div className="App-bg"></div>

    </div>
  );
}

export default App;