const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

const userId = '603a3159c37e2d67387cf5a9'; // extract userid from auth

const createProfile = catchAsync(async (req, res) => {
  const profile = await profileService.createProfile({ ...req.body, user: userId });
  res.status(httpStatus.CREATED).send(profile);
});

const getUserProfiles = catchAsync(async (req, res) => {
  const profiles = await profileService.getProfiles(userId);
  res.status(httpStatus.OK).send(profiles);
});

module.exports = {
  createProfile,
  getUserProfiles,
};
