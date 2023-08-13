var express = require('express');
var router = express.Router();
const programsCtrl = require('../controllers/programs')

router.get('/', programsCtrl.programs);
router.get('/random', programsCtrl.random);


module.exports = router;