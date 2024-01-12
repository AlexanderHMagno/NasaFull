//This will hold express configuration

const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = new express();

//Use CORS middleware and allow crossorigen from the Client

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Add logins WITH MORGAN (this is a middleware to display logs about the incoming request)
app.use(morgan("combined"));

//Receive body and convert it to JSON and we can obtain this as req.body
app.use(express.json());
//Serving the react site as static file
app.use(express.static(path.join(__dirname, "..", "public")));

//Here we create the router itself

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.use("/*", (req, res) => res.sendFile("index.html"));

module.exports = app;
