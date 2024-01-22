const {
  getAllLaunches,
  createLaunch,
  abortMission,
  missionExistsById,
} = require("../../models/launches/launches.model");

async function httpGetAllLaunches(req, res) {
  //Values returns a iterable and not the correct value
  return res.status(200).json(await getAllLaunches());
}

async function httpcreateLaunch(req, res) {
  const data = req.body;

  //data Validation

  if (!data.mission) {
    return res.status(400).json({
      error: "You didnt provide a valide mission name",
    });
  }

  data.launchDate = new Date(data.launchDate);

  if (isNaN(data.launchDate)) {
    return res.status(400).json({
      error: "Provide a valid mission Launch Date",
    });
  }

  const newLaunch = await createLaunch(data);
  return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);
  //Dont exits return an invalid status
  const missionExists = await missionExistsById(id);
  if (!missionExists) {
    return res.status(404).json({
      error: "launch doesnt exists",
    });
  }

  const aborted = await abortMission(id);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpcreateLaunch,
  httpAbortLaunch,
};
