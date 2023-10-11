const fs = require("fs");

class TeamService {
  static getTeamList() {
    return JSON.parse(fs.readFileSync("../data/teams.json"));
  }
  static addTeam(team, list) {
    list.push(team);
    fs.writeFileSync("../data/teams.json", JSON.stringify(list));
  }

  static editTeam(team, id, list) {
    list[id] = team;
    fs.writeFileSync("../data/teams.json", JSON.stringify(list));
  }

  static deleteTeam(id, list) {
    list.splice(id, 1);
    fs.writeFileSync("../data/teams.json", JSON.stringify(list));
  }
}

module.exports = TeamService;
