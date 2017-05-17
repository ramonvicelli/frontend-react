const api = require('../api');

module.exports = function (app) {

  app.route('/authors')
    .get(api.authors);
};
