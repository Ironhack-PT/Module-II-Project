const Game = require('../models/Game.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  res.render('user/new-game');
}

module.exports.doCreate = (req, res, next) => {
  const newGame = {
    ...req.body,
    user: req.user.id
  }
  console.log({ newGame });

  Game.create(newGame)
    .then(game => {
      res.redirect('../new-game.hbs')
    })
    .catch(err => {
      if (mongoose.Error.ValidationError) {
        res.render('user/new-game', { game: req.body, errors: err.errors }) // no recuerdo para que era el req.body.body
      }
      next(err)
    })
}

module.exports.delete = (req, res, next) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => next(err))
}