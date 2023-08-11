var express = require('express');
var router = express.Router();
const programsCtrl = require('../controllers/programs')

/* GET home page. */
router.get('/', programsCtrl.index);

module.exports = router;
