const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ErrorNames = require('../utils/error-names');
const StatusCodes = require('../utils/status-codes');
const StatusMessages = require('../utils/status-messages');
const { JWT_SECRET } = require('../utils/constants');

const {
  BadRequestError, UnauthorizedError, NotFoundError, ConflictError,
} = require('../errors/index');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.status(StatusCodes.OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        next(new BadRequestError(StatusMessages.INVALID_ID));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        next(new BadRequestError(StatusMessages.INVALID_ID));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => res.status(StatusCodes.CREATED).send(user))
        .catch((err) => {
          if (err.name === ErrorNames.MONGO && err.code === StatusCodes.MONGO_ERROR) {
            next(new ConflictError(StatusMessages.CONFLICT));
          } else if (err.name === ErrorNames.VALIDATION) {
            next(new BadRequestError(`Переданы некорректные данные при создании пользователя: ${err}`));
          } else {
            next(err);
          }
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        next(new BadRequestError(StatusMessages.INVALID_ID));
      } else if (err.name === ErrorNames.VALIDATION) {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === ErrorNames.CAST) {
        next(new BadRequestError(StatusMessages.INVALID_ID));
      } else if (err.name === ErrorNames.VALIDATION) {
        next(new BadRequestError(`Переданы некорректные данные при обновлении аватара: ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Кука удалена' });
  next();
};
