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

  req.body.name = name.replace(/\s/g, '-').toLowerCase() + '-video';
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
  res.render('media-coverage.jade', { title: 'Media Coverage'});
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

  res.render('success-media-coverage.jade');
};

exports.awards = function(req, res){
  res.render('awards.jade', { title: 'Awards'});
};

exports.awardsHandler = function(req, res) {

  fs.appendFile('awards.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });

  res.render('success-awards.jade');
};

exports.pressRelease = function(req, res){
  res.render('press-release.jade', { title: 'Press Release'});
};

exports.pressHandler = function(req, res) {
  var content = req.body.content;
  var title = req.body.title;
  var dateFull = req.body.date;
  var dateFormat = new Date(dateFull);
  var date = dateFormat.getMonth() + 1 + "/" + dateFormat.getDate() + "/" + dateFormat.getFullYear();
  var dateArray = date.split('/');
  var shortTitle = req.body.shortTitle;
  var location = req.body.location;
  var contentFooter = "<p><strong>About Yodle</strong><br>Yodle helps local businesses to find and keep their customers simply and profitably. Yodle delivers a comprehensive platform that makes online marketing easy, affordable, and transparent for its 45,000+ local business clients. Yodle&#8217;s flagship product, Marketing Essentials&#8482;, includes a comprehensive desktop, mobile, web and social presence, reviews and offer management, and email campaign automation.  Marketing Essentials can be supplemented with Yodle Ads, Yodle&#8217;s proprietary and optimized paid search technology.  Also offered by Yodle is Lighthouse 360&#174;, which automates many of our clients&#8217; daily consumer interactions or office routines such as appointment reminders, leading to improved operational efficiency and business results. Additionally, Yodle offers Centermark&#174;, intended to meet the unique marketing challenges of networked businesses helping them to unify, scale, and optimize their local and national strategies.  Yodle currently has 200+ networked business clients including Merry Maids, Miracle-Ear, TWO MEN AND A TRUCK&#174;, and Cottman Transmission and Total Auto Care.</p><p>Yodle has been included on the Forbes list of America’s most promising companies for the last four years and has also won multiple awards for its business growth, job creation, technology innovation, and workplace and culture.  For more information, visit <a href=\"http://www.yodle.com/\">www.yodle.com</a>, <a href=\"http://www.lh360.com/\" target=\"_blank\">www.lh360.com</a>, <a href=\"http://www.yodlebrandnetworks.com/\" target=\"_blank\">www.yodlebrandnetworks.com</a> or <a href=\"http://www.yodlecareers.com/\" target=\"_blank\">www.yodlecareers.com</a>.</p>"
  console.log(dateFull);
  console.log(dateFormat);
  req.body.name = title.replace(/\s/g, '-').toLowerCase();
  req.body.date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1] + 'T05:00:00.000Z';
  req.body.content = '<strong><span itemprop=\"dateline\">' + location + '</span> - <span itemprop=\"datePublished\">' + dateFull + '</span> -</strong>' + " " + content + contentFooter;
  req.body.blockquote = shortTitle;

  fs.appendFile('press-release.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });

  res.render('success-press-release.jade');
};


exports.caseStudies = function(req, res){
  res.render('case-studies.jade', { title: 'Case Studies'});
};

exports.caseStudiesHandler = function(req, res){
  var subheader = req.body.subheader;
  var title = req.body.title;
  var supersegmentTitle = req.body.supersegmentTitle;
  var content = req.body.content;
  var re = /[\r\n]+/;
  var contentParaBreaks = content.split(re);
  var newContent ='';

  for (var i = 0; i < contentParaBreaks.length; i++) {
    newContent += '<p>' + contentParaBreaks[i] + '</p>\n';
  }
  console.log(newContent);
  req.body.content = newContent;
  req.body.name = subheader.replace(/\s/g, '-').toLowerCase();
  req.body.segmentName = title.replace(/\s/g, '-').toLowerCase();
  req.body.segmentTitle = title;
  req.body.supersegmentName = supersegmentTitle.replace(/\s/g, '-').toLowerCase();

  fs.appendFile('case-studies.yml', formToYaml(req.body), function(err) {
    if (err) throw err;
    console.log('Data appended');
  });

  res.render('success-case-studies.jade');
};
