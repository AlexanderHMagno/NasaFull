const launchesSchema = require("./launches.schema");

//this can be replaced
const launchNumber = 100;

async function getAllLaunches() {
  return await launchesSchema.find({});
}

async function missionExistsById(id) {
  return await launchesSchema.findOne({ flightNumber: id });
}

async function createLaunch(launch) {
  const newLaunch = Object.assign(launch, {
    flightNumber: await findNextFlightNumber(),
  });

  return await launchesSchema.create(newLaunch);
}

async function abortMission(id) {
  return await launchesSchema.findOneAndUpdate(
    { flightNumber: id },
    { upcoming: false, succeess: false }
  );
}

async function findNextFlightNumber() {
  const latest = await launchesSchema.findOne(
    {},
    { flightNumber: 1, _id: -1 },
    { sort: { flightNumber: -1 } }
  );

  if (latest) return latest.flightNumber + 1;
  else return launchNumber;
}

module.exports = {
  getAllLaunches,
  createLaunch,
  missionExistsById,
  abortMission,
};
