var express = require('express');
var router = express.Router();
var controllers = require('../controllers/main');

router.get('/', function(req, res) {
  res.render('index', { title: 'Media Submissions' });
});

router.get('/video-testimonials', controllers.videoTestimonials);
router.post('/success', controllers.videoTestimonialsHandler);

router.get('/media-coverage', controllers.mediaCoverage);
router.post('/success-media-coverage', controllers.mediaCoverageHandler);

router.get('/awards', controllers.awards);
router.post('/success-awards', controllers.awardsHandler);

router.get('/press-release', controllers.pressRelease);
router.post('/success-press-release', controllers.pressHandler);

router.get('/case-studies', controllers.caseStudies);
router.post('/success-case-studies', controllers.caseStudiesHandler);

module.exports = router;
