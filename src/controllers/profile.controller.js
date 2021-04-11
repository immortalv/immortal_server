const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

const createProfile = catchAsync(async (req, res) => {
  const userId = req.user.sub;
  const profile = await profileService.createProfile({ ...req.body, userId });
  res.status(httpStatus.CREATED).send(profile);
});

const getUserProfiles = catchAsync(async (req, res) => {
  const userId = req.user.sub;
  const profiles = await profileService.getProfiles(userId);
  res.status(httpStatus.OK).send(profiles);
});

module.exports = {
  createProfile,
  getUserProfiles,
};
