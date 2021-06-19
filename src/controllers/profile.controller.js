const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { PROFILE_TYPES } = require('../config/profile');
const pick = require('../utils/pick');
const { toRegex } = require('../utils/string');
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

const getProfile = catchAsync(async (req, res) => {
  const profile = await profileService.getProfileById(req.params.id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  res.send(profile);
});

const updateProfile = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfileById(req.params.id, req.body);
  res.send(profile);
});

const deleteProfile = catchAsync(async (req, res) => {
  await profileService.deleteProfileById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getPublicProfiles = catchAsync(async (req, res) => {
  const { name = '' } = req.query;
  const filter = { profileType: PROFILE_TYPES.PUBLIC, name: toRegex(name, 'ig') };

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await profileService.queryProfiles(filter, options);
  res.send(result);
});

module.exports = {
  createProfile,
  getUserProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
  getPublicProfiles,
};
