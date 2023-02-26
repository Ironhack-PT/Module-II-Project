const Game = require("../models/Game.model")
const mongoose = require("mongoose")
const { modelName } = require("../models/User.model")

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

	if (req.files) {
		newGame.image = req.files.map(file => file.path);
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
		.catch((err) => console.err(err))
}

module.exports.update = (req, res, next) => {
	Game.findByIdAndUpdate(req.params.id)
		.then((game) => {
			res.render("user/game-update", { game })
		})
		.catch((err) => console.log(err))
}

module.exports.doUpdate = (req, res, next) => {

	const editGame = {
		...req.body,
		user: req.user.id,
	}

	if (req.files) {
		editGame.image = req.files.map(file => file.path);
	}

	Game.findByIdAndUpdate(req.params.id, editGame)
		.then(() => {
			res.redirect("/profile")
		})
		.catch((err) => console.err(err))
}

module.exports.search = (req, res, next) => {
	Game.find({ 
		title: { '$regex': req.body.value, $options: 'i' } ,
		user: { $ne: req.user.id }
	})
		.then((games) => {
			res.render("user/total-games", { games })
		})
		.catch((err) => {
			if (mongoose.Error.ValidationError) {
				renderWithErrors(err.errors)
			} else {
				next(err)
			}
		})}
