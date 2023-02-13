const Game = require('../models/Game.model')

module.exports.profile = (req, res, next) => {
  Game.find({ user: req.user.id })
    .then(games => {
      res.render('user/profile', { games })
    })
    .catch(next)
}