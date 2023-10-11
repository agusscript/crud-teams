const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "../public/uploads/img" });

const TeamService = require("../services/teamService");
const teamList = TeamService.getTeamList();
const Team = require("../entities/team");
const Area = require("../entities/area");

router.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    data: {
      teamList,
    },
  });
});

router.get("/view/:id", (req, res) => {
  const urlParamId = req.params.id;
  const selectedTeam = teamList.find((team) => team.id == urlParamId);

  res.render("details", {
    layout: "main",
    data: {
      selectedTeam,
    },
  });
});

router.get("/form/add", (req, res) => {
  res.render("form-add", {
    layout: "main",
  });
});

router.post("/form/add", upload.single("image"), (req, res) => {
  const randomId = uuidv4();
  const area = new Area(2072, req.body.country);
  const crestUrl = req.file && "/uploads/img/" + req.file.filename;
  const lastUpdated = new Date().toISOString();

  const newTeam = new Team(
    randomId,
    area,
    req.body.name,
    req.body.shortName,
    req.body.tla,
    crestUrl,
    req.body.address,
    req.body.phone,
    req.body.website,
    req.body.email,
    req.body.founded,
    req.body.clubColors,
    req.body.venue,
    lastUpdated
  );

  TeamService.addTeam(newTeam, teamList);
  res.redirect("/");
});

router.post("/form/edit/:id", upload.single("image"), (req, res) => {
  const urlParamId = req.params.id;
  const area = new Area(2072, req.body.country);
  const prevImage = teamList.find((team) => team.id == urlParamId).crestUrl;
  const crestUrl = req.file ? "/uploads/img/" + req.file.filename : prevImage;
  const lastUpdated = new Date().toISOString();

  const updatedTeam = new Team(
    urlParamId,
    area,
    req.body.name,
    req.body.shortName,
    req.body.tla,
    crestUrl,
    req.body.address,
    req.body.phone,
    req.body.website,
    req.body.email,
    req.body.founded,
    req.body.clubColors,
    req.body.venue,
    lastUpdated
  );

  const selectedTeamId = teamList.findIndex((team) => team.id == urlParamId);
  TeamService.editTeam(updatedTeam, selectedTeamId, teamList);
  res.redirect("/");
});

router.get("/form/edit/:id", (req, res) => {
  const urlParamId = req.params.id;
  const selectedTeam = teamList.find((team) => team.id == urlParamId);

  res.render("form-edit", {
    layout: "main",
    data: {
      selectedTeam,
    },
  });
});

router.get("/form/delete/:id", (req, res) => {
  const urlParamId = req.params.id;
  const selectedTeam = teamList.find((team) => team.id == urlParamId);

  res.render("form-delete", {
    layout: "main",
    data: {
      selectedTeam,
    },
  });
});

router.post("/form/delete/:id", (req, res) => {
  const urlParamId = req.params.id;
  const selectedTeamId = teamList.findIndex((team) => team.id == urlParamId);
  TeamService.deleteTeam(selectedTeamId, teamList);
  res.redirect("/");
});

module.exports = router;
