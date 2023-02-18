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
