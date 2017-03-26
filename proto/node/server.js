// *************************************************** //
// * Overpress Server Core *************************** //
// * Alpha Stage ************************************* //
// * Developed by: *********************************** //
// * Carlos Eduardo (carlosed_almeida@live.com) ****** //
// *************************************************** //

//
// Set-up initial variables
//

var express = require('express'),
    app = express(),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    port = 1000;

//
// Routes
//

app.use('/', router);

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/', function (req, res) {
    res.sendFile('index.html', { root : __dirname });
});

router.get(/^(.+)$/, function (req, res) {
    res.sendfile(__dirname + req.params[0]);
});

server = app.listen(port, function () {
    console.log('   info  - Server listening on port ' + port);
});