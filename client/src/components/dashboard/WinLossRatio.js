function WinLossRatio(props) {

  const winLossRatio = (matchdata) => {
    console.error(matchdata);
    let wins = 0;
    let losses = 0;
    if(Object.keys(matchdata).length > 0) {
      matchdata.forEach((match) => {
        let isInRed = match.players.red.find((player) => {
          return player.name === props.account.name && player.tag === props.account.tag;
        });
        if(isInRed) {
          if(match.teams.red.rounds_won > match.teams.blue.rounds_won) {
            wins++;
          } else {
            losses++;
          }
        } else {
          if(match.teams.blue.rounds_won > match.teams.red.rounds_won) {
            wins++;
          } else {
            losses++;
          }
        }
      });
    }
    let ratio = wins / (wins + losses);
    return ratio * 100;
  }
  return (
    ' ' + winLossRatio(props.matchdata) + '%'
  );
}

export default WinLossRatio;