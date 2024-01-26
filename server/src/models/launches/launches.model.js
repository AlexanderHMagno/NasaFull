const launchesSchema = require("./launches.schema");
const axios = require("axios");

//this can be replaced
const launchNumber = 100;

async function getAllLaunches() {
  return await launchesSchema.find({});
}

async function missionExistsById(id) {
  return await findLaunch({ flightNumber: id });
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
    customers: ["alex inc", "NASA"],
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

async function findLaunch(filter) {
  return await launchesSchema.findOne(filter);
}

async function loadSpaceXData() {
  const alreadySet = await findLaunch({
    flightNumber: 100,
    rocket: "Falcon 9",
  });
  if (alreadySet) return;

  console.log("Loading Space X data");

  const launches = await axios.post(
    "https://api.spacexdata.com/v5/launches/query",
    {
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: "name",
          },
          {
            path: "payloads",
            select: "customers",
          },
        ],
      },
    }
  );

  for (const launch of launches.data.docs) {
    const {
      payloads,
      name,
      rocket,
      date_local,
      flight_number,
      success,
      upcoming,
    } = launch;
    const customers = payloads.flatMap((data) => data["customers"]);

    const newLaunch = {
      mission: name,
      rocket: rocket.name,
      launchDate: date_local,
      target: "Kepler-442-b",
      flightNumber: flight_number,
      success: !!success,
      upcoming: upcoming,
      customers,
    };

    await saveLaunch(newLaunch);
  }
}

module.exports = {
  loadSpaceXData,
  getAllLaunches,
  scheduleNewLaunch,
  missionExistsById,
  abortMission,
};
