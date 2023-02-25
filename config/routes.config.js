const express = require('express');
const passport = require("passport")
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const gameController = require('../controllers/game.controller');
const userController = require('../controllers/user.controller');
const rentController = require("../controllers/rent.controller");
const upload = require('../config/cloudinary.config');


const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
  

router.get('/', (req, res, next) => {
    res.render('misc/index', { dontRenderSearchbar: true })
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
router.post('/new-game', authMiddleware.isAuthenticated, upload.array('image'), gameController.doCreate);
router.post('/profile/:id/delete', authMiddleware.isAuthenticated, gameController.delete);
router.get('/profile/:id/edit', authMiddleware.isAuthenticated, gameController.update);
router.post('/profile/:id/edit', authMiddleware.isAuthenticated, upload.array('image'), gameController.doUpdate);


// RENT

router.get("/game/:id/rent", authMiddleware.isAuthenticated, rentController.createRent);

router.post("/game/:id/rent", authMiddleware.isAuthenticated, rentController.doCreateRent);

router.post("/game/search", gameController.search)

router.patch("/rent/:id", authMiddleware.isAuthenticated, rentController.doEdit);

router.get("/profile/pending-validations", authMiddleware.isAuthenticated, rentController.pendingValidation);

router.post('/rent/:id/delete', authMiddleware.isAuthenticated, rentController.doDelete);

router.get("/rent/historic", authMiddleware.isAuthenticated, rentController.historic );

router.get("/rent/favorites", authMiddleware.isAuthenticated, rentController.printFavorites );

router.post('/rent/:id/favorites', authMiddleware.isAuthenticated, rentController.favorites);


//PROFILE

router.get("/profile", authMiddleware.isAuthenticated, userController.profile);
router.get("/rent-a-game", userController.findRent);
router.get("/profile/:id/edit-profile", authMiddleware.isAuthenticated, userController.edit)
router.post("/profile/edit-profile", authMiddleware.isAuthenticated, upload.single('image'), userController.doEdit)


//LOGOUT

router.get("/logout", authController.doLogout)

module.exports = router;