//Imports requireToken from middleware
const { requireToken } = require('../middleware/auth');

//Imports express and creates a router
const express = require('express')
const router = express.Router()

//Imports review controllers
const reviewsCtrl = require('../controllers/reviews')

//Creates a get all reviews route
router.get('/', reviewsCtrl.index);

//Creates a get review by id route
router.get('/:id', reviewsCtrl.show);

//Creates a get associated reviews by id route
router.get('/associated/:id', reviewsCtrl.associated);

//Creates a get user reviews by id router
router.get('/users/:id', reviewsCtrl.users);

//Creates a new review post route, requiring a token
router.post('/', requireToken, reviewsCtrl.create);

//Creates an update review by id router, requiring a token
router.put('/:id', requireToken, reviewsCtrl.update);

//Creates a delete review router, requiring a token
router.delete('/:id', requireToken, reviewsCtrl.delete);

//Exports router
module.exports = router

