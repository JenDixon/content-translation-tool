var fs = require('fs');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var yaml = require('yamljs');
var special = require('special-html');

var routes = require('./routes/index');
var users = require('./routes/users');
var middleware = require('./middleware/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Form Submission

app.post('/media-coverage', function(req, res) {
    var content = req.body.content;
    var date = req.body.date;
    var dateArray = date.split('/');

    req.body.content = '<p>' + content + '</p>';
    req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';


    fs.appendFile('media-coverage.yml', formToYaml(req.body), function(err) {
        if (err) throw err;
        console.log('Data appended');
    });

    res.end();
});

app.post('/awards', function(req, res) {

    var content = req.body.content;
    var date = req.body.date;
    var dateArray = date.split('/');

    req.body.content = '<p>' + content + '</p>';
    req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';


    fs.appendFile('awards.yml', formToYaml(req.body), function(err) {
        if (err) throw err;
        console.log('Data appended');
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
});

app.post('/press-release', function(req, res) {
    var content = req.body.content;
    var title = req.body.title;
    var date = req.body.date;
    var dateArray = date.split('/');
    var shortTitle = req.body.shortTitle;
    var location = req.body.location;

    req.body.name = title.replace(/\s/g, '-').toLowerCase();
    req.body.content = '<p>' + content + '</p>';
    req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';
    req.body.blockquote = shortTitle;

    fs.appendFile('press-release.yml', formToYaml(req.body), function(err) {
        if (err) throw err;
        console.log('Data appended');
    });

    res.end();
});

var formToYaml = function(mediaData) {
    var yamlString = yaml.stringify(mediaData);
    var yamlFile = "" +
      "  -\n" +
      special(yamlString) +
      "\n";

    return yamlFile;
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

// Start the app
http.createServer(app).listen(3001, function() {
    console.log('Express app started');
});