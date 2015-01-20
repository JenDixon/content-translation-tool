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
  console.log('rendering the page');
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
