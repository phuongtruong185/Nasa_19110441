const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const {getPagination} = require('../../services/query');

const httpGetAllLaunches = async (req, res) => {
  const {skip, limit} = getPagination(req.query);

  return res.status(200).json(await getAllLaunches(skip, limit));
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

const httpAbortLaunch =async (req, res) => {
  const launchId = Number(req.params.id);
  if (!launchId) {
    return res.status(400).json({
      error: "Missing required launch ID",
    });
  }
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
