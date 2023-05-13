import React, { useState, useEffect } from 'react';
import PlayerList from './playerList';

function dashboard(props) {

    const userData = props.userData;
    const [riotUsername, setRiotUsername] = useState("");
    const [addingAccount, setAddingAccount] = useState(false);
    const [valAccounts, setValAccounts] = useState([]);

    const accountErrMsg = React.useRef(null);

    useEffect(() => {
        document.title = "VALORGG - Dashboard";
        if (userData)
        {
            setValAccounts(userData.valorantAccounts);
            console.log(userData.valorantAccounts);
            console.log(valAccounts);
        }
      }, []);

    const pressAddAccount = () => {
        setAddingAccount(true);
    }

    const handleRiotUsername = (e) => {
        setRiotUsername(e.target.value);
    }

    const pressCancel = () => {
        setAddingAccount(false);
    }

    const renderErrorMsg = (msg) => {
        accountErrMsg.current.innerHTML = msg;
    }

    const getRiotUsername = () => {

        let url = '/valorantapi/val-account-data/';

        let riotUsernameSplit = riotUsername.split("#");
        let riotGameId = riotUsernameSplit[0];
        let riotGameTag = riotUsernameSplit[1];

        url += riotGameId + "/" + riotGameTag;

        console.log("getting user " + riotGameId + " " + riotGameTag);
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Wrong Riot username");
            }
            return response.json();
        }, (err) => {
            console.log(err);
            renderErrorMsg("Error: " + err);
        })
        .then( (res) => 
        {
            if (!res.status < 200 || res.status > 299)
            {
                throw new Error("Wrong Riot username");
            }
            console.log(res);
        }, (err) => {
            console.log(err);
        }).then( () => pass, () => {
            renderErrorMsg("Such Valorant account does not exist!");
        });
        

        setAddingAccount(false);
    }

    return (

        <div className="d-flex flex-column bg-dark border border-dark rounded p-5 align-items-center">

            
            <h1 className="h1">Dashboard</h1>

            <div className="m-3 p-3">
                <h1 className="h3">Welcome, {userData ? (userData.username) : ("!NULL DATA!")}!</h1>
            </div>

            <h1 className="h3">Accounts</h1>

            <table className="table table-dark">
                < PlayerList accounts = { valAccounts }/>
            </table>

            {
                addingAccount ? (

                <div className="d-flex flex-row">
                    <input type="text" className="form-control" placeholder="riotusername#NA1" onChange={ handleRiotUsername }/>
                    <button className="btn btn-success mx-2" onClick={ getRiotUsername }>Add</button>
                    <button className="btn btn-danger" onClick={ pressCancel }>Cancel</button>
                </div> ) : (

                <div className="d-flex flex-column justify-content-end">
                    <button className="btn btn-danger" onClick={ pressAddAccount }>Add Valorant Account</button>
                    <div>
                        <p ref={accountErrMsg} className="pt-2 text-danger"></p>
                    </div>
                </div> )
            }


        </div>

    )
    
}

export default dashboard;