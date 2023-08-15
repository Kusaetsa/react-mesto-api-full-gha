const signinRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(2)
      .max(30),
    password: Joi.string().min(8).max(30).required(),
  }),
}), login);

module.exports = signinRouter;
