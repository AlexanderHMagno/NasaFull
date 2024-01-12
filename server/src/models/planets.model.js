const { createReadStream } = require("fs");
const { pipeline } = require("node:stream/promises");
const { parse } = require("csv-parse");
const os = require("os");
const path = require("path");

const habitable_Planets = [];

//check if a planet is habitable

const habitability = (planet) => {
  return [planetConfirmed, habitabilitySize, habitabilityDistance].every(
    (apply) => apply(planet)
  );
};

const planetConfirmed = (planet) => planet["koi_disposition"] == "CONFIRMED";
const habitabilityDistance = (planet) =>
  planet["koi_insol"] > 0.3 && planet["koi_insol"] < 1.2;

const habitabilitySize = (planet) => planet["koi_prad"] < 1.6;

async function loadPlanets() {
  return await createReadStream(
    path.join(__dirname, "..", "..", "data", "exoplanets.csv")
  )
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", (planet) => {
      if (habitability(planet)) {
        habitable_Planets.push(planet);
      }
    })
    .on("error", (err) => console.log(err))
    .on("end", () => {});
}

//This is really cool cause this is explaing how LIBUV is working here, the Readstream belongs to Node, not to JS.
// which means is the stream goes to work with the event loop and not the main JS stack, this is using the power
// of distributing the workload in other parts of the OS.

function getAllPlanets() {
  return habitable_Planets;
}

module.exports = {
  getAllPlanets,
  loadPlanets,
};
