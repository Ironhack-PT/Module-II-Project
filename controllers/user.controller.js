const Game = require('../models/Game.model')

module.exports.profile = (req, res, next) => {
  Game.find({ user: req.user.id })
    .then(games => {
      res.render('user/profile', { games })
    })
    .catch(err => console.err(err))
}

module.exports.findRent = (req, res, next) => {
  Game.find({ user: { $ne: req.user.id }})
    .then(games => {
      res.render('user/total-games', { games })
    })
    .catch(err => console.err(err))
}

