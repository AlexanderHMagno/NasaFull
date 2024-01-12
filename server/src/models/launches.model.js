const launches = new Map();
//this can be replaced
let launchNumber = 100;

const setInitialLaunch = {
  flightNumber: 100,
  mission: "Kepler Exploration",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442-b",
  customer: ["alex inc", "NASA"],
  upcoming: true,
  succeess: true,
};

launches.set(setInitialLaunch.flightNumber, setInitialLaunch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function missionExistsById(id) {
  return launches.has(id);
}

function createLaunch(launch) {
  launchNumber++;

  const newLaunch = Object.assign(launch, {
    flightNumber: launchNumber,
    customer: ["alex", "Nasa"],
    upcoming: true,
    succeess: true,
  });

  launches.set(newLaunch.flightNumber, newLaunch);

  return newLaunch;
}

function abortMission(id) {
  const launch = launches.get(id);
  launch.upcoming = false;
  launch.succeess = false;
  return launch;
}

module.exports = {
  getAllLaunches,
  createLaunch,
  missionExistsById,
  abortMission,
};
