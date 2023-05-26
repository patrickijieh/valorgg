const getMatchData = (matchObj) => {
  matchObj = matchObj.data;

  const sanitizedData = matchObj.map((match) => {
    const sanitizedMatch = {
      "metadata" : match.metadata,
      "players" : {
        "red" : match.players.red,
        "blue" : match.players.blue
      },
      "teams" : match.teams
    }
    return sanitizedMatch;
  });
  
  return sanitizedData;
}

module.exports = getMatchData;