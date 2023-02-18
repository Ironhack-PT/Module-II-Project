const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isHome', function (options) {
  console.log(options.hash);
  if (options && !options.hash.dontRenderSearchbar) {
    return options.fn(this);
  }
})
