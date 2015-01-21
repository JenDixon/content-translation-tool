var express = require('express');
var router = express.Router();
var controllers = require('../controllers/main');

router.get('/', function(req, res) {
  res.render('index', { title: 'Media Submissions' });
});

router.get('/video-testimonials', controllers.videoTestimonials);
router.post('/success', controllers.videoTestimonialsHandler);

router.get('/media-coverage', function(req, res) {
  res.render('media-coverage', { title: 'Media Coverage'});
});

router.get('/awards', function(req, res) {
  res.render('awards', { title: 'Awards'});
});

router.get('/press-release', function(req, res) {
  res.render('press-release', { title: 'Press Releases'});
});

module.exports = router;
