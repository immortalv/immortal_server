const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { profileTypes, profilTemplates } = require('../config/profile');
const { profileFileSchema } = require('./profile-file.model');

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionAdditional: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    deathDate: {
      type: Date,
      required: true,
    },
    epitaph: {
      type: String,
      trim: true,
    },
    profileType: {
      type: String,
      enum: profileTypes,
      default: 'public',
    },
    template: {
      type: String,
      enum: profilTemplates,
      default: 'simple',
    },
    mainPhoto: profileFileSchema,
    coverPhoto: profileFileSchema,
    otherPhotos: [profileFileSchema],
    otherFiles: [profileFileSchema],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
profileSchema.plugin(toJSON);
profileSchema.plugin(paginate);

/**
 * @typedef Profile
 */
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
