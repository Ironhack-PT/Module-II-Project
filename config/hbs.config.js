const hbs = require("hbs")
const path = require("path")

hbs.registerPartials(path.join(__dirname, "../views/partials"))

hbs.registerHelper("formatDate", (date, options) => {
	let array = date.toString().split(" ")
	return `${array[1]} ${array[2]} ${array[3]}`
})

hbs.registerHelper("isValidating", (options) => {
	const { rent } = options.hash
	console.log("****** ", options.hash)
	if (rent.status === "Requested") {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})

hbs.registerHelper("isRented", (options) => {
	const { rent } = options.hash
	console.log("****** ", options.hash)
	if (rent.status === "Rented") {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})

hbs.registerHelper("isHome", function (options) {
	console.log(options.hash)
	if (options && !options.hash.dontRenderSearchbar) {
		return options.fn(this)
	}
})

hbs.registerHelper("hasFavorite", function (options) {
	const { favorites, rent} = options.hash
	console.log(favorites, rent)
	if (favorites.some((favorite) => favorite.rent.toString() === rent.id)) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})
