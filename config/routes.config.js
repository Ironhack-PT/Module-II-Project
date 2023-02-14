const express = require('express');
const passport = require("passport")
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const gameController = require('../controllers/game.controller');
const userController = require('../controllers/user.controller')
const upload = require('../config/cloudinary.config');


const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
  

router.get('/', (req, res, next) => {
    res.render('misc/index')
  })


//SIGNUP

router.get('/register',  authMiddleware.isNotAuthenticated, authController.register)
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister)


//LOGIN

router.get('/login',  authMiddleware.isNotAuthenticated, authController.login)
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin)
router.get('/login/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)


// GAMES

router.get('/new-game', authMiddleware.isAuthenticated, gameController.create);
router.post('/new-game', authMiddleware.isAuthenticated, upload.single('image'), gameController.doCreate);
router.post('/profile/:id/delete', authMiddleware.isAuthenticated, gameController.delete);
router.get('/profile/:id/edit', authMiddleware.isAuthenticated, gameController.update);
router.post('/profile/:id/edit', authMiddleware.isAuthenticated, upload.single('image'), gameController.doUpdate);


//router.post('/tweets/:id/like', authMiddleware.isAuthenticated, userController.like); esto lo usaremos para las valoraciones


//PROFILE

router.get("/profile", authMiddleware.isAuthenticated, userController.profile);
router.get("/rent-a-game",authMiddleware.isAuthenticated,userController.findRent);


//LOGOUT

router.get("/logout", authController.doLogout)

module.exports = router;