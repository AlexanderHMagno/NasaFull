const express = require("express");
const {
  httpGetAllLaunches,
  httpcreateLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

// create endpoints
const launchesRouter = express.Router();

//Get all Launches
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpcreateLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
