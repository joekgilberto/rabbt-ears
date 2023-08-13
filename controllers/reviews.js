const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    reviews
}

function reviews(req,res,next){
    res.send('Welcome to the reviews page!')
}