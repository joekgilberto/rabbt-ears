//Imports requireToken from middleware
const { requireToken } = require('../middleware/auth');

//Imports express and creates a router
const express = require('express');
const router = express.Router();

//Imports auth controllers
const authCtrl = require('../controllers/auth');

//Creates a register post route
router.post('/register', authCtrl.register);

//Creates a login post route
router.post('/login', authCtrl.login);

//Creates a logout get route
router.get('/logout', authCtrl.logout);

//Creates a get by id route
router.get('/:id', authCtrl.show);

//Creates an update by id route, requiring a token
router.put('/:id', requireToken, authCtrl.update);

//Exports router
module.exports = router;
