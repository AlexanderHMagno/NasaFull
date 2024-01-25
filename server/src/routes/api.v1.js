const express = require("express");

const api_v1 = express.Router();

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

api_v1.use("/planets", planetsRouter);
api_v1.use("/launches", launchesRouter);

module.exports = api_v1;
