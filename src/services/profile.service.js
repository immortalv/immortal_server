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

const getProfiles = async (user) => {
  const profiles = await Profile.find({ user });
  return profiles;
};

module.exports = {
  createProfile,
  getProfiles,
};
