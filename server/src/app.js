//This will hold express configuration

const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const API_V1 = require("./routes/api.v1");

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

//VERSIONING APIS
app.use("/v1", API_V1);
app.use("/*", (req, res) => res.sendFile("index.html"));

module.exports = app;
