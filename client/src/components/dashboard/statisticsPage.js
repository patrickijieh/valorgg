import { useEffect, useState } from 'react';

function statisticsPage(props) {

  const [matches, setMatches] = useState([]);

  return (
    <div className="d-flex flex-column bg-dark border border-dark rounded p-5 align-items-center">
      <h1 className="h1">{props.account.name}#{props.account.tag}</h1>
    </div>
  );

}

export default statisticsPage;