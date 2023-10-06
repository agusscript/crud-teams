const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("../public"));

const mapTeam = require("./mappers/teamMapper");
const teamsData = JSON.parse(fs.readFileSync("../data/teams.json"));

app.get("/", (req, res) => {
  const teams = teamsData.map((teamInfo) => mapTeam(teamInfo));

  res.render("home", {
    layout: "main",
    data: {
      teams,
    },
  });
});

app.get("/form/add", (req, res) => {
  res.render("form-add", {
    layout: "main",
  });
});

app.get("/view/:id", (req, res) => {
  const urlParamId = Number(req.params.id);
  const selectedTeam = teamsData.find((team) => team.id === urlParamId);
  const mappedTeam = mapTeam(selectedTeam);

  res.render("details", {
    layout: "main",
    data: {
      mappedTeam,
    },
  });
});

app.get("/form/edit/:id", (req, res) => {
  const urlParamId = Number(req.params.id);
  const selectedTeam = teamsData.find((team) => team.id === urlParamId);
  const mappedTeam = mapTeam(selectedTeam);

  res.render("form-edit", {
    layout: "main",
    data: {
      mappedTeam,
    },
  });
});

app.listen(PORT);
console.log(`Listen in http://localhost:${PORT}`);
