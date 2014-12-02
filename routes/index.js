var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Media Submissions' });
});

router.get('/video-testimonials', function(req, res) {
  res.render('video-testimonials', { title: 'Video Testimonials'});
});

router.get('/media-coverage', function(req, res) {
  res.render('media-coverage', { title: 'Media Coverage'});
});

module.exports = router;
