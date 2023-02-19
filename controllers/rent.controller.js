const Game = require("../models/Game.model");
const mongoose = require("mongoose");
const Rent = require("../models/Rent.model");
const sendMail = require('../config/mailer.config');

module.exports.createRent = (req, res, next) => {
    Game.findById(req.params.id)
        .then((game)=> {
            console.log('********* ', game);
            res.render("rent/rent-game", {game})
        })
}

module.exports.doCreateRent = (req, res, next) => {
    Rent.create(req.body)
    .populate({
        path    : 'game',
        populate: { path: 'user' }
    })
    .then((rent)=>{
        sendMail(rent.tenant.email, rent.tenant.username)
        res.redirect('/profile')
    })
    .catch(error=> res.send(error))
}   


module.exports.pendingValidation = (req, res, next) => {
    Rent.find({ $or: [{ tenant: req.user.id }, { renter: req.user.id }] },)
    .populate({
        path    : 'game',
        populate: { path: 'user' }
    })
    .then((pendingRents) => {
        const rentsReducer = pendingRents.reduce((acc, rent) => {
            console.log(rent.renter.toString(), req.user.id)
            if (rent.renter.toString() === req.user.id) {
                acc.rented ? acc.rented = [...acc.rented, rent] : acc.rented = [rent]
            }
            if (rent.tenant.toString() === req.user.id) {
                acc.requested ? acc.requested = [...acc.requested, rent] : acc.requested = [rent]
            }
            return acc
        }, {})
        // console.log('rents que soy renter', rentsReducer)
        res.render("rent/pending-validations", {rentsReducer})
    })
    .catch(error=> res.send(error))
    console.log(req.user.id);

}

module.exports.doEdit = (req, res, next) => {
  console.log('ID', req.params.id)
  console.log('newStatus', req.query.newStatus)
  Rent.findByIdAndUpdate(req.params.id, { $set : { status: req.query.newStatus}})
  .then()
  .catch()
}

