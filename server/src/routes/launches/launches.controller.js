const {
  getAllLaunches,
  createLaunch,
  abortMission,
  missionExistsById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  //Values returns a iterable and not the correct value
  return res.status(200).json(getAllLaunches());
}

function httpcreateLaunch(req, res) {
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

  //Assuming we are passing the correct data, we need to validate this data
  const newLaunch = createLaunch(data);

  return res.status(201).json(newLaunch);
}

function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);
  //Dont exits return an invalid status
  if (!missionExistsById(id)) {
    return res.status(404).json({
      error: "launch doesnt exists",
    });
  }

  //
  const aborted = abortMission(id);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpcreateLaunch,
  httpAbortLaunch,
};
