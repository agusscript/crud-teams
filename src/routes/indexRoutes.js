const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "../public/uploads/img" });

const teamList = JSON.parse(fs.readFileSync("../data/teams.json"));
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

router.get("/form/add", (req, res) => {
  res.render("form-add", {
    layout: "main",
  });
});

router.post("/form/add", upload.single("image"), (req, res) => {
  const {
    country,
    name,
    shortName,
    tla,
    founded,
    address,
    venue,
    clubColors,
    website,
    email,
    phone,
  } = req.body;

  const randomId = uuidv4();
  const area = new Area(2072, country);
  const crestUrl = `/uploads/img/${req.file.filename}`;
  const lastUpdated = new Date().toISOString();

  const newTeam = new Team(
    randomId,
    area,
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated
  );

  teamList.push(newTeam);
  fs.writeFileSync("../data/teams.json", JSON.stringify(teamList));
  res.redirect("/");
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

module.exports = router;
