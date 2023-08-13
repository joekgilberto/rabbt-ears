var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.get('/', reviewsCtrl.reviews);

module.exports = router;