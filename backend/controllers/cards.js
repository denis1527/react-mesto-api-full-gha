const Card = require('../models/card');
const ErrorNames = require('../utils/error-names');
const StatusCodes = require('../utils/status-codes');
const StatusMessages = require('../utils/status-messages');

const { NotFoundError, ForbiddenError, BadRequestError } = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(StatusCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === ErrorNames.VALIDATION) {
        next(new BadRequestError(`Переданы некорректные данные при создании карточки: ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        next(new ForbiddenError(StatusMessages.FORBIDDEN));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(StatusCodes.OK).send({ message: StatusMessages.OK }))
          .catch(next);
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

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.send(card);
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(StatusMessages.NOT_FOUND));
      } else {
        res.send(card);
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
