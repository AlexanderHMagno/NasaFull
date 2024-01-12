const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

//Here we create the router for this location

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
