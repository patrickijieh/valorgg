import { useEffect, useState } from 'react';
import MatchHistory from './matchHistory.js';

function statisticsPage(props) {

  const [matches, setMatches] = useState({});

  useEffect(() => {
    console.log("getting match history");

    const matchdata = fetch("/valorantapi/val-account-data/matches/" + props.account.name + "/" + props.account.tag)
    .then((response) => response.json())
    .then((data) => {console.log(data); setMatches(data);})
    .catch((error) => console.error(error));
  }, []);

  return (
    <div className="d-flex flex-column bg-dark border border-dark rounded p-5 align-items-center">
      <h1 className="h1 pb-3">{props.account.name}#{props.account.tag}</h1>
      
      <h3 className="h3 pt-3">Match History</h3>
      <table className="table table-dark">
        <MatchHistory matchdata={matches}/>
      </table>
    </div>
  );

}

export default statisticsPage;