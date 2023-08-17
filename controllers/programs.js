const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index,
    show,
    random
}

function index(req,res,next){
    res.send('Welcome to the index page!')
}

function show(req,res,next){
    const id = req.params.id
    res.send(`Welcome to the ${id} page!`)
}

function random(req,res,next){
    res.send('Welcome to a random program page!')
}