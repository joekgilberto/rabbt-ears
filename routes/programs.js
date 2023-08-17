var express = require('express');
var router = express.Router();
const programsCtrl = require('../controllers/programs')

router.get('/', programsCtrl.index);
router.get('/:id', programsCtrl.show);
router.get('/random', programsCtrl.random);


module.exports = router;