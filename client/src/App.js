import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login.js';
import Register from './components/signup.js';
import Dashboard from './components/dashboard.js';
import logo from './valorantgg icon.png'

function App() {

  const [doLogin, setLogin] = useState(false);
  const [doRegister, setRegister] = useState(false);
  const [doDash, setDash] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log(userData.username);
  }, [userData]);

  const pressLogin = () => {
    setLogin(true);
  }

  const pressRegister = () => {
    setRegister(true);
  }

  const pressDashboard = () => {
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

  const pressHome = () => {
    setLogin(false);
    setRegister(false);
    setDash(false);

    document.title = "VALORGG";

  }

  const getUser = (user) => {
    setUserData(user);
  }

  return (

    // APP BACKGROUND & NAVBAR
    <div className="App-bgimage min-vw-100 min-vh-100">
      <div className="d-flex flex-column text-light">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">

          <a className="navbar-brand" href="#" onClick={ pressHome }>VALORGG</a>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={ pressHome }>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={ pressDashboard }>Dashboard</a>
            </li>
          </ul>

        </nav>

        {/* APP CONTENT (main div)*/}
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">

    { !doLogin ? (
      !doRegister ? (
        !doDash ? (

            // HOME PAGE
            <div className="d-flex flex-column text-light justify-content-center align-items-center border border-dark rounded p-5 bg-dark" >
              <h1 className="h2">VALORGG</h1>
              <h3 className="h6 py-4">Track the match history of any Valorant account</h3>

              <img src={logo} className="img-fluid w-25 h-25" alt="ValorGG Logo"/>

              <div>
                <button className="btn btn-danger px-4 m-3" onClick = { pressLogin }>
                  Login
                </button>

                <button className="btn btn-danger px-4 m-3" onClick = { pressRegister }>
                  Sign Up
                </button>
              </div>
            </div>

    ) : (

      // DASHBOARD PAGE
      < Dashboard userData = { userData }/>

    ) ) : ( 

      // REGISTER PAGE
    < Register updateRegister={ updateRegister } updateLogin={ updateLogin } goDash={ goDash } getUser={ getUser } />

    ) ) : (

      // LOGIN PAGE
    < Login updateLogin={ updateLogin } updateRegister={ updateRegister } goDash={ goDash } getUser={ getUser }/>

    ) }

        </div>

        {/* APP FOOTER */}
        <footer className="d-inline-flex bg-dark text-light p-3">
          <div>
            <a href="https://github.com/patrickijieh/valorgg" target="_blank" className="h5 text-primary px-4">GitHub</a>
          </div>
          <div className="px-2">
            Copyright &copy; Patrick Ijieh 2023
          </div>
        </footer>
      </div>
    </div>

  );

}

export default App;
