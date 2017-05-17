var http = require('http')
    ,app = require('./config/express');

http.createServer(app).listen(3001, function() {
    console.log('Listening port: ' + this.address().port);
});

