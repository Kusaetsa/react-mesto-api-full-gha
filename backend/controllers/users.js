const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK,
  CREATED,
} = require('../utills/statusCodes');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
}

function getUser(req, res, next) {
  return User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(OK).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, about, avatar, password: hash,
    }))
    .then((user) => {
      const sendUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      };
      res.status(CREATED).send(sendUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next('Ошибка по умолчанию');
    });
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next('Ошибка по умолчанию');
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next('Ошибка по умолчанию');
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findAndCheckUser(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(OK).send({ token });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      return res.status(OK).send(user);
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
