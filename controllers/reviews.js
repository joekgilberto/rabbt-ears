const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index,
    show
}

function index(req,res,next){
    res.send('Welcome to the reviews page!')
}

function show(req,res,next){
    const id = req.params.id
    res.send(`Welcome to the ${id} reviews page!`)
}