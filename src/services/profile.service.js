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

const getProfile = async (id) => {
  const profile = await Profile.findById(id);
  return profile;
};

module.exports = {
  createProfile,
  getProfiles,
  getProfile,
};
