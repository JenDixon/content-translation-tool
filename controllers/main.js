//-------------------------------------
// Module Dependencies
//-------------------------------------

var fs = require('fs');
var yaml = require('yamljs');
var special = require('special-html');

var formToYaml = function(mediaData) {
  var yamlString = yaml.stringify(mediaData);
  var yamlFile = "" +
    "  -\n" +
    special(yamlString) +
    "\n";

  return yamlFile;
};

//-------------------------------------
// Controllers
//-------------------------------------

exports.videoTestimonials = function (req, res) {
  res.render('video-testimonials.jade', { title: 'Video Testimonials'});
};

exports.videoTestimonialsHandler = function (req, res) {
  var name = req.body.title;
  var segmentName = req.body.segmentTitle;
  var supersegmentName = req.body.supersegmentTitle;

  req.body.name = name.replace(/\s/g, '-').toLowerCase();
  req.body.segmentName = segmentName.replace(/\s/g, '-').toLowerCase();
  req.body.supersegmentName = supersegmentName.replace(/\s/g, '-').toLowerCase();
  req.body.videoEmbed = req.body.videoEmbed.split('/').pop();
  req.body.posterFrame = name.replace(/\s/g, '-').toLowerCase();

  fs.appendFile('video-testimonials.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });
  res.render('success.jade');
};

exports.mediaCoverage = function (req, res) {
  res.render('media-coverage', { title: 'Media Coverage'});
};

exports.mediaCoverageHandler = function (req, res) {
  var content = req.body.content;
  var date = req.body.date;
  var dateArray = date.split('/');

  req.body.content = '<p>' + content + '</p>';
  req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';


  fs.appendFile('media-coverage.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });

  res.render('success.jade');
};

exports.awards = function(req, res){
  res.render('awards', { title: 'Awards'})
};

exports.awardsHandler = function(req, res) {
  var content = req.body.content;
  var date = req.body.date;
  var dateArray = date.split('/');

  req.body.content = '<p>' + content + '</p>';
  req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';


  fs.appendFile('awards.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });

  res.render('success.jade');
};

exports.pressRelease = function(req, res){
  res.render('press-release.jade', { title: 'Press Release'})
};

exports.pressReleaseHandler = function(req, res) {
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

  res.render('success.jade');
};
