import React, { useEffect, useState } from 'react';
import MatchHistory from './matchHistory.js';
import sample from '../../sample.json';
import WinLossRatio from './WinLossRatio.js';

function statisticsPage(props) {

  const [matches, setMatches] = useState({});
  const errorMsg = React.useRef(null);

  useEffect(() => {
    console.log("getting match history");

    const matchdata = fetch("/valorantapi/val-account-data/matches/" + props.account.name + "/" + props.account.tag)
    .then((response) => response.json())
    .then((data) => {console.log(data); setMatches(data); errorMsg.current.innerHTML = "";})
    .catch((error) => {
      console.error(error);
      errorMsg.current.innerHTML = "Could not load Competitive match history. Please try again later.";
    });

    //setMatches(sample);
  }, []);

  return (
    <div className="d-flex flex-column bg-dark border border-dark rounded p-5 align-items-center">
      <h1 className="h1 pb-3">{props.account.name}#{props.account.tag}</h1>
      
      <h3 className="h3 py-3">Match History</h3>
      <div className="">
        <p className="h3 text-center py-3">W/L Ratio (Past 5 Games):
          <WinLossRatio matchdata={matches} account={props.account}/>
        </p>
        <MatchHistory matchdata={matches} account={props.account}/>
        <div className="text-center"><h4 ref={errorMsg} className="text-center h4">Loading...</h4></div>
      </div>
    </div>
  );

}

export default statisticsPage;