const api = require('../api');

module.exports = function (app) {

  app.route('/authors')
    .get(api.authors)
    .post(api.add);

  app.route('/books')
    .get(api.books)
    .post(api.booksadd);
};
