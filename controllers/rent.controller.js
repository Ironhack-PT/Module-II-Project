const Game = require("../models/Game.model")
const mongoose = require("mongoose")
const Rent = require("../models/Rent.model")

module.exports.createRent = (req, res, next) => {
    Game.findById(req.params.id)
        .then((game)=> {
            console.log('********* ', game);
            res.render("rent/rent-game", {game})
        })
}

module.exports.doCreateRent = (req, res, next) => {
    Rent.Create(req.body)
    .then((rent)=>{
        res.redirect('/profile')
    })
    .catch(err => console.err(err))
}



// module.exports.pendingValidation = (req, res, next) => {
//     res.render("rent/pending-validations")
// }

// module.exports.doPendingValidation = (req, res, next) => {
//     Game.findById(req.params.id)
//     .then((game)=> {
//         console.log('********* ', game);
//         res.render("rent/pending-validations", {user})
//     })
// }