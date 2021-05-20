const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProfile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    birthDate: Joi.date().required(),
    deathDate: Joi.date().required(),
  }),
};

// const getUsers = {
//   query: Joi.object().keys({
//     name: Joi.string(),
//     role: Joi.string(),
//     sortBy: Joi.string(),
//     limit: Joi.number().integer(),
//     page: Joi.number().integer(),
//   }),
// };

const getProfile = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProfile = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const deleteProfile = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
