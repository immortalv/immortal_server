const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { profileTypes, profilTemplates } = require('../config/profile');

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
    mainPhoto: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    media: [
      {
        type: String,
      },
    ],
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
