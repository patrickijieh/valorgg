import React, { useState, useEffect } from 'react';
import PlayerList from './playerList.js';
import StatisticsPage from './statisticsPage.js';

function dashboard(props) {

    const [userData, setUserData] = useState(props.userData);
    const [showStatsPage, setShowStatsPage] = useState(false);
    const [trackedAccount, setTrackedAccount] = useState(null);
    const [riotUsername, setRiotUsername] = useState("");
    const [addingAccount, setAddingAccount] = useState(false);
    const [valAccounts, setValAccounts] = useState([]);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [errorStyle, setErrorStyle] = useState("pt-2 text-danger");

    const accountErrMsg = React.useRef(null);

    useEffect(() => {
        document.title = "VALORGG - Dashboard";
        if (userData)
        {
            setValAccounts(userData.valorantAccounts);
            console.log(userData.valorantAccounts);
            console.log(valAccounts);
        }

        else {
            setValAccounts([
                {
                    "name": "tazio",
                    "tag": "NA1"
                },
                {
                    "name": "mothers milkerz",
                    "tag": "NA1"
                }
            ]);
        }

        setShowStatsPage(false);
        console.log("dashboard useeffect");
      }, []);

    const pressAddAccount = () => {
        accountErrMsg.current.innerHTML = "";
        setErrorStyle("pt-2 text-danger");
        setAddingAccount(true);
    }

    const updateUserData = (data) => {
        props.updateUserData(data);
        setUserData(data);
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

        setInputDisabled(true);

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
            })
            .then( (res) => 
            {
                if (res.status < 200 || res.status > 299)
                {
                    throw new Error(res.status);
                }
                console.log(res);
                updateUserList(res.data);
            })
            .then(() => {setAddingAccount(false); setInputDisabled(false); setErrorStyle("pt-2 text-success")})
            .catch((err) => {
                console.error(err);
                setAddingAccount(false);
                setInputDisabled(false);
                renderErrorMsg("Such Valorant account does not exist!");
            });
        }

    const updateUserList = (data) => {
        let url = '/users/from-user/' + userData.username;
        let newName = data.name;
        let newTag = data.tag;

        setValAccounts([...valAccounts, {name: newName, tag: newTag}]);

        fetch(url,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({valorantAccounts: [...valAccounts, {name: newName, tag: newTag}]})
            }).then(response => {console.log(response); renderErrorMsg("Valorant account added!")}, (err) => {console.error(err)});
    }

    const getStats = (account) => {
        setTrackedAccount(account);
        setShowStatsPage(true);
    }

    return (
        showStatsPage ? (
          <StatisticsPage account={trackedAccount}/>
        ) : (
        <div className="d-flex flex-column bg-dark border border-dark rounded p-5 align-items-center">
            
            <h1 className="h1">Dashboard</h1>

            <div className="m-3 p-3">
                <h1 className="h3">Welcome, {userData ? (userData.username) : ("!NULL DATA!")}!</h1>
            </div>

            <h1 className="h3">Accounts</h1>

            <table className="table table-dark">
                <PlayerList data={userData} accounts={valAccounts} updateUserData={updateUserData} getStats={getStats}/>
            </table>

            { addingAccount ? (
                <div className="d-flex flex-row">
                    <input type="text" className="form-control" placeholder="riotusername#NA1" onChange={handleRiotUsername} disabled={inputDisabled}/>
                    <button className="btn btn-success mx-2" onClick={getRiotUsername} disabled={inputDisabled}>Add</button>
                    <button className="btn btn-danger" onClick={pressCancel} disabled={inputDisabled}>Cancel</button>
                </div> 
            ) : (
                <div className="d-flex flex-column justify-content-end">
                    <button className="btn btn-danger" onClick={pressAddAccount}>Add Valorant Account</button>
                </div>
            ) }
            <div>
                <p ref={accountErrMsg} className={errorStyle}></p>
            </div>
        </div> )
    );
}

export default dashboard;