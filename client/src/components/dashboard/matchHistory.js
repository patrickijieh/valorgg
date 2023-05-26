import { useEffect, useState } from 'react';

function matchHistory(props) {

  const [matchdata, setMatchdata] = useState(null);

  useEffect(() => {
    setMatchdata(props.matchdata);
  }, [props.matchdata]);

  let matchList;

  if (matchdata) {
    if (Object.keys(matchdata).length > 0) {
      console.log(matchdata);
      matchList = matchdata.map((match) => {
        return (
        <tr key={match.metadata.matchid}>
          <td key={match.metadata.matchid} className="h1">{match.metadata.map}</td>
        </tr>
        )
      });

    }
  }

  return (
    matchList ? (
      <tbody className="p-3">
        {matchList}
      </tbody>
    ) : (
      <tbody className="p-3">
        <tr>
          <td>Loading...</td>
        </tr>
      </tbody>
    )
    
  )
}

export default matchHistory;