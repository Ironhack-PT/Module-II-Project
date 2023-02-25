require("dotenv").config()
require("./config/db.config")
const express = require("express")
const logger = require("morgan")
const passport = require('passport');
const createError = require("http-errors")


require("./config/hbs.config")
require('./config/passport.config');
const { sessionConfig } = require('./config/session.config')
const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.use(express.static("public"));

// Session middleware
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

const router = require('./config/routes.config');

/** Router **/
app.use('/', router)

/**
 * Error Middlewares
 */


app.use((req, res, next) => {
	next(createError(404, 'Resource not found'));
  });
  
  app.use((error, req, res, next) => {
	console.log(error)
	let status = error.status || 500;
  
	res.status(status).render('error', {
	  message: error.message,
	  error: req.app.get('env') === 'development' ? error : {}
	})
  })

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`App listening on port ${port}`));