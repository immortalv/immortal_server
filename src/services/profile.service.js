const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Profile } = require('../models');

/**
 * Create a profile
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const createProfile = async (profileBody) => {
  const profile = await Profile.create(profileBody);
  return profile;
};

const getProfiles = async (userId) => {
  const profiles = await Profile.find({ userId });
  return profiles;
};

/**
 * Get profile by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getProfileById = async (id) => {
  return Profile.findById(id);
};

/**
 * Update profile by id
 * @param {ObjectId} profileId
 * @param {Object} updateBody
 * @returns {Promise<Profile>}
 */
const updateProfileById = async (userId, updateBody) => {
  const profile = await getProfileById(userId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(profile, updateBody);
  await profile.save();
  return profile;
};

/**
 * Delete profile by id
 * @param {ObjectId} profileId
 * @returns {Promise<Profile>}
 */
const deleteProfileById = async (profileId) => {
  const profile = await getProfileById(profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  await profile.remove();
  return profile;
};

module.exports = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
};
