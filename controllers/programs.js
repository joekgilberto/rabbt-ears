const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    programs,
    random
}

function programs(req,res,next){
    res.send('Welcome to the programs page!')
}

function random(req,res,next){
    res.send('Welcome to a random program page!')
}