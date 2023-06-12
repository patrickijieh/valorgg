import './dashboard.css';

function blueTeam(props) {

  const importRanks = (r) => {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.webp', '')] = r(item); });
    return images;
   }

  const patchRank = (tier) => {
    let imagelink;
    const images = importRanks(require.context('../../assets/ranks/', false, /\.(png|jpe?g|svg|webp)$/));

    switch (tier) {
      case "Iron 1":
        imagelink = images.iron_1;
        break;
      
      case "Iron 2":
        imagelink = images.iron_2;
        break;
      
      case "Iron 3":
        imagelink = images.iron_3;
        break;
      
      case "Bronze 1":
        imagelink = images.bronze_1;
        break;
      
      case "Bronze 2":
        imagelink = images.bronze_2;
        break;
      
      case "Bronze 3":
        imagelink = images.bronze_3;
        break;
      
      case "Silver 1":
        imagelink = images.silver_1;
        break;
      
      case "Silver 2":
        imagelink = images.silver_2;
        break;
      
      case "Silver 3":
        imagelink = images.silver_3;
        break;

      case "Gold 1":
        imagelink = images.gold_1;
        break;
      
      case "Gold 2":
        imagelink = images.gold_2;
        break;
        
      case "Gold 3":
        imagelink = images.gold_3;
        break;
      
      case "Platinum 1":
        imagelink = images.platinum_1;
        break;

      case "Platinum 2":
        imagelink = images.platinum_2;
        break;
      
      case "Platinum 3":
        imagelink = images.platinum_3;
        break;

      case "Diamond 1":
        imagelink = images.diamond_1;
        break;
      
      case "Diamond 2":
        imagelink = images.diamond_2;
        break;

      case "Diamond 3":
        imagelink = images.diamond_3;
        break;

      case "Ascendant 1":
        imagelink = images.ascendant_1;
        break;
      
      case "Ascendant 2":
        imagelink = images.ascendant_2;
        break;
      
      case "Ascendant 3":
        imagelink = images.ascendant_3;
        break;

      case "Immortal 1":
        imagelink = images.immortal_1;
        break;

      case "Immortal 2":
        imagelink = images.immortal_2;
        break;

      case "Immortal 3":
        imagelink = images.immortal_3;
        break;

      case "Radiant":
        imagelink = images.radiant;
        break;
      
      default:
        imagelink = images.unranked;
    }

    return imagelink;
  }

  const ratio = (kills, deaths) => {
    return (kills/deaths).toFixed(2);
  }

  const hsRatio = (body, leg, head) => {
    const total = body + leg + head;
    return ((head/total)*100).toFixed(2);
  }

  let blueTeam = props.teamArray.map((player) => {
    return (
      <div className="d-flex flex-row py-2" key={player.puuid}>
        <img src={patchRank(player.currenttier_patched)} alt="rank" className="img-fluid agent-image"/>
        <img src={player.assets.agent.small} alt="agent" className="img-fluid agent-image"/>
        <div className="d-flex flex-column">
          <div className="d-flex player-name mx-5">
            <p className="h6 text-primary">{player.name}#{player.tag}<br></br>({player.currenttier_patched})</p>
          </div>
          <div className="text-light mx-5 px-0 statistics">
            <p>K/D/A: {player.stats.kills}/{player.stats.deaths}/{player.stats.assists} ({ratio(player.stats.kills,player.stats.deaths)}:1)</p>
            <p>HS %: {hsRatio(player.stats.bodyshots, player.stats.legshots, player.stats.headshots,)}</p>
          </div>
        </div>
      </div>
    )
  });
  
  return (
    <div>
      {blueTeam}
    </div>
  );
}

export default blueTeam;