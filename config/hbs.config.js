const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('formatDate', (date, options) => {
   let array = date.toString().split(' ');
   return `${array[1]} ${array[2]} ${array[3]}`;
})

hbs.registerHelper('isValidating', (options) => {
    const { rent } = options.hash;
    console.log('****** ', options.hash);
    if (rent.status === 'Requested') {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
  })

  hbs.registerHelper('isRented', (options) => {
    const { rent } = options.hash;
    console.log('****** ', options.hash);
    if (rent.status === 'Rented') {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
  })

hbs.registerHelper('isHome', function (options) {
  console.log(options.hash);
  if (options && !options.hash.dontRenderSearchbar) {
    return options.fn(this);
  }
})

//LIKES

/* hbs.registerHelper('hasLike', function (options) {
  const { currentUser, tweet } = options.hash;

  // like.tweet no es de tipo string, es de tipo object porque es un objectId
  // así que le metemos un .toString() y asi se compara guay
  if (currentUser.likes.some(like => like.tweet.toString() === tweet.id)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}) */
