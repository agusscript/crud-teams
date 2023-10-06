const express = require("express");
const router = express.Router();
const fs = require("fs");
const mapTeam = require("../mappers/teamMapper");
const teamsData = JSON.parse(fs.readFileSync("../data/teams.json"));

router.get("/", (req, res) => {
  const teams = teamsData.map((teamInfo) => mapTeam(teamInfo));

  res.render("home", {
    layout: "main",
    data: {
      teams,
    },
  });
});

router.get("/form/add", (req, res) => {
  res.render("form-add", {
    layout: "main",
  });
});

router.get("/view/:id", (req, res) => {
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

router.get("/form/edit/:id", (req, res) => {
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

module.exports = router;
