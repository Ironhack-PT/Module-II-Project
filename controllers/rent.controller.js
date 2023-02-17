const Game = require("../models/Game.model");
const mongoose = require("mongoose");
const Rent = require("../models/Rent.model");

module.exports.createRent = (req, res, next) => {
    Game.findById(req.params.id)
        .then((game)=> {
            console.log('********* ', game);
            res.render("rent/rent-game", {game})
        })
}

module.exports.doCreateRent = (req, res, next) => {
    Rent.create(req.body)
    .then((rent)=>{
        res.redirect('/profile')
    })
    .catch(error=> res.send(error))
}



module.exports.pendingValidation = (req, res, next) => {
    Rent.find({ renter: req.user.id })
    .then((pendingGames) => {
        res.render("rent/pending-validations", {pendingGames})
    })
    .catch(error=> res.send(error))
    console.log(req.user.id);

}