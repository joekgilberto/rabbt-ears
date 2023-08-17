var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.get('/', reviewsCtrl.index);
router.get('/:id', reviewsCtrl.show);


module.exports = router;