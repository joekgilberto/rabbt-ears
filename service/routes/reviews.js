const { requireToken } = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const reviewsCtrl = require('../controllers/reviews')

router.get('/', reviewsCtrl.index);

router.get('/:id', reviewsCtrl.show);

router.get('/associated/:id', reviewsCtrl.associated);

router.get('/users/:id', reviewsCtrl.users);

router.post('/', requireToken, reviewsCtrl.create);

router.put('/:id', requireToken, reviewsCtrl.update);

router.delete('/:id', requireToken, reviewsCtrl.delete);

module.exports = router

