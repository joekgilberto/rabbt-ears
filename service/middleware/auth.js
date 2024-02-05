//Imports passport, bcrypt, and jwt
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Imports User model and passport-jwt functions
const { User } = require('../models');
const { Strategy, ExtractJwt } = require('passport-jwt');

//Imports secret from environmental variables
const secret = process.env.JWT_SECRET;

//Defines options for passport Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

//Creates function to verify a user
async function verify(jwt_payload, done){
  try {
    const user = await User.findById(jwt_payload.id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

//Creates instance of Strategy with above options and verify function
const strategy = new Strategy(opts, verify);

//Passes strategy to passport and initializes it
passport.use(strategy);
passport.initialize();

//Creates requireToken from passport
const requireToken = passport.authenticate('jwt', { session: false });

//Creates function to create a user token
async function createUserToken(req, user){
  if (
    !user ||
    !req.body.password ||
    !bcrypt.compareSync(req.body.password, user.password)
  ) {
    const error = new Error('The provided username or password is incorrect');
    error.statusCode = 422;
    throw error;
  }

  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

//Creates function to validate a user's ownership of a document
function handleValidateOwnership(req, document){
    const ownerId = document.owner;
    
    if (!req.user._id.equals(ownerId)) {
      throw Error('Unauthorized Access');
    } else {
      return document;
    }
};

//Exports middleware
module.exports = {
  requireToken,
  createUserToken,
  handleValidateOwnership
};