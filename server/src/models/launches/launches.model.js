const launchesSchema = require("./launches.schema");

//this can be replaced
const launchNumber = 100;

async function getAllLaunches() {
  return await launchesSchema.find({});
}

async function missionExistsById(id) {
  return await launchesSchema.findOne({ flightNumber: id });
}

async function abortMission(id) {
  return await saveLaunch({
    flightNumber: id,
    upcoming: false,
    succeess: false,
  });
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

async function scheduleNewLaunch(launch) {
  const organizeLaunch = Object.assign(launch, {
    flightNumber: await findNextFlightNumber(),
    customer: ["alex inc", "NASA"],
  });

  return await saveLaunch(organizeLaunch);
}

async function saveLaunch(launch) {
  const data = await launchesSchema.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true, new: true }
  );
  return data;
}
module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  missionExistsById,
  abortMission,
};
