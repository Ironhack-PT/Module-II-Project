
const { modelName } = require("../models/Game.model")
const Game = require("../models/Game.model")
const Like = require("../models/Like.model")
const User = require("../models/User.model")

module.exports.profile = (req, res, next) => {
	Game.find({ user: req.user.id })
		.then((games) => {
			res.render("user/profile", { games })
		})
		.catch((err) => console.err(err))
}

module.exports.findRent = (req, res, next) => {
	if (req.user) {
		Game.find({ user: { $ne: req.user.id } })
			.then((games) => {
				res.render("user/total-games", { games })
			})
			.catch((err) => console.err(err))
	} else {
		Game.find()
			.then((games) => {
				res.render("user/total-games", { games })
			})
			.catch((err) => console.err(err))
	}
}

module.exports.edit = (req, res, next) => {
  res.render("user/edit-profile")
}

module.exports.doEdit = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
	User.findByIdAndUpdate(req.user, req.body, {image: req.body})
		.then(() => {
      res.redirect("/profile")
})
		.catch((err) => next(err))
}