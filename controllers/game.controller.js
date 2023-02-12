const Game = require("../models/Game.model")
const mongoose = require("mongoose")

module.exports.create = (req, res, next) => {
	res.render("user/new-game")
}

module.exports.doCreate = (req, res, next) => {
	const renderWithErrors = (errors) => {
		res.render("user/new-game", {
			game: req.body,
			errors,
		})
	}

	const newGame = {
		...req.body,
		user: req.user.id,
	}
	console.log({ newGame })

	if (req.file) {
		newGame.image = req.file.path
	}

	Game.create(newGame)
		.then((game) => {
			res.redirect("/profile")
		})
		.catch((err) => {
			if (mongoose.Error.ValidationError) {
				renderWithErrors(err.errors)
			} else {
				next(err)
			}
		})
}

module.exports.delete = (req, res, next) => {
	Game.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect("/profile")
		})
		.catch((err) => next(err))
}
