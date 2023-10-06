const Team = require("../entities/team");

function mapTeam(teamsData) {
  const newTeam = new Team(
    teamsData.id,
    teamsData.name,
    teamsData.shortName,
    teamsData.tla,
    teamsData.crestUrl,
    teamsData.area.name,
    teamsData.founded,
    teamsData.address,
    teamsData.venue,
    teamsData.clubColors,
    teamsData.website,
    teamsData.phone,
    teamsData.email
  );

  return newTeam;
}

module.exports = mapTeam;
