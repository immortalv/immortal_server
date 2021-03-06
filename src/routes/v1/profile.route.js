const express = require('express');
const validate = require('../../middlewares/validate');
const { checkJwt } = require('../../middlewares/jwt-auth');
const profileValidation = require('../../validations');
const { profileController } = require('../../controllers');

const router = express.Router();

router.route('/public').get(profileController.getPublicProfiles);

router
  .route('/')
  .post(checkJwt, validate(profileController.createProfile), profileController.createProfile)
  .get(checkJwt, profileController.getUserProfiles);

router
  .route('/:id')
  .get(validate(profileValidation.getProfile), profileController.getProfile)
  .patch(checkJwt, validate(profileValidation.updateProfile), profileController.updateProfile)
  .delete(checkJwt, validate(profileValidation.deleteProfile), profileController.deleteProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management and retrieval
 */

/**
 * @swagger
 * path:
 *  /profile:
 *    post:
 *      summary: Create a profile
 *      tags: [Profile]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - description
 *                - descriptionAdditional
 *                - birthDate
 *                - deathDate
 *                - epitaph
 *                - profileType
 *                - template
 *                - mainPhoto
 *                - coverPhoto
 *                - media
 *                - role
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                descriptionAdditional:
 *                  type: string
 *                birthDate:
 *                  type: date
 *                deathDate:
 *                  type: date
 *                epitaph:
 *                  type: string
 *                profileType:
 *                  type: string
 *                  enum: [public, privat]
 *                template:
 *                  type: string
 *                  enum: [simple, book, article]
 *                mainPhoto:
 *                  type: string
 *                coverPhoto:
 *                  type: string
 *                media:
 *                   type: [string]
 *              example:
 *                name: fake name
 *                description: fake description
 *                birthDate: 01:02:1900
 *                deathDate: 01:02:1990
 *                profileType: public
 *                template: simple
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 */
