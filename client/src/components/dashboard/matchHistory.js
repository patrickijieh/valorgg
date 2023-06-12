import { useEffect, useState } from 'react';
import './dashboard.css';
import RedTeam from './redTeam';
import BlueTeam from './blueTeam';

function matchHistory(props) {

  const [matchdata, setMatchdata] = useState(null);

  useEffect(() => {
    setMatchdata(props.matchdata);
  }, [props.matchdata]);

  const collapseToggle = (e) => {
    let buttonElement = e.target;
    let collapseTarget = buttonElement.getAttribute("collapsible").split("#")[1];
    let collapse = document.getElementById(collapseTarget);
    if (collapse.getAttribute("style") === "display: flex;") {
      collapse.setAttribute("style", "display: none;");
      buttonElement.setAttribute("aria-expanded", "false");
      buttonElement.parentElement.setAttribute("class", "d-flex flex-row justify-content-center align-items-center py-4 title-card");
    }
    else {
      collapse.setAttribute("style", "display: flex;");
      buttonElement.setAttribute("aria-expanded", "true");
      buttonElement.parentElement.setAttribute("class", "d-flex flex-row justify-content-center align-items-center py-4 title-card dropup");
    }
  }

  let matchList;

  if (matchdata) {
    if (Object.keys(matchdata).length > 0) {
      console.log(matchdata);

      matchList = matchdata.map((match) => {

        let matchid = match.metadata.matchid;
        let target = "#" + matchid;
        let isInRed = match.players.red.find((player) => {
          return player.name === props.account.name && player.tag === props.account.tag;
        });
        console.log(isInRed);
        return (
        <div key={matchid}>

          <div className="d-flex flex-row py-3">
            <div className="border-secondary border-bottom py-2">
              <div className="d-flex flex-row justify-content-center align-items-center py-4 title-card">
                <p className="text-center h5 map-title mx-auto">{match.metadata.map} (Competitive)</p>
                {isInRed ? (
                  <div className="d-flex flex-row mx-auto">
                    <p className="text-danger text-center h2 mx-2">{match.teams.red.rounds_won}</p>
                    <p className="text-secondary text-center h2 mx-2">-</p>
                    <p className="text-primary text-center h2 mx-2">{match.teams.blue.rounds_won}</p>
                  </div>
                ) : (
                  <div className="d-flex flex-row mx-auto">
                    <p className="text-primary text-center h2 mx-2">{match.teams.blue.rounds_won}</p>
                    <p className="text-secondary text-center h2 mx-2">-</p>
                    <p className="text-danger text-center h2 mx-2">{match.teams.red.rounds_won}</p>
                  </div>
                )}
                <button className="btn btn-secondary dropdown-toggle" onClick={(e) => {collapseToggle(e)}} data-toggle="collapse" data-target={target} type="button" collapsible={target} aria-expanded="false" aria-controls={matchid}>
                </button>
              </div>

              <div style={{display: 'none'}} id={matchid}>
              <div>
                  {isInRed ? (
                    <div>
                      <RedTeam teamArray={match.players.red}/>
                      <div className="py-2 border-bottom border-secondary"></div>
                      <div className="py-2 border-top border-secondary"></div>
                      <BlueTeam teamArray={match.players.blue}/>
                    </div> ) : (
                    <div>
                      <BlueTeam teamArray={match.players.blue}/>
                      <div className="py-2 border-bottom border-secondary"></div>
                      <div className="py-2 border-top border-secondary"></div>
                      <RedTeam teamArray={match.players.red}/>
                    </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      });

    }
  }

  return (
    matchList ? (
      <div className="">
        {matchList}
      </div>
    ) : (
      <div className="p-3">
      </div>
    )
    
  )
}

export default matchHistory;