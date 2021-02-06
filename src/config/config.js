const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGO_URL: Joi.string().required().description('Mongo DB url'),
    MONGO_DB: Joi.string().required().description('Mongo DB name'),
    MONGO_USERNAME: Joi.string().required().description('Mongo DB user name'),
    MONGO_PASSWORD: Joi.string().required().description('Mongo DB password'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    USER_EMAIL: Joi.string().description('username for email server'),
    USER_PASSWORD: Joi.string().description('password for email server'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT || 8081,
  mongoose: {
    url: `mongodb+srv://${envVars.MONGO_USERNAME}:${envVars.MONGO_PASSWORD}@${envVars.MONGO_URL}/${envVars.MONGO_DB}?retryWrites=true&w=majority`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    verifyUserExpirationMinutes: 3600,
    resetPasswordExpirationMinutes: 10,
  },
  email: {
    smtp: {
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    },
  },
};
