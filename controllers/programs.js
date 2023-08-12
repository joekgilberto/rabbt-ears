const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index
}

async function index(req,res,next){
    res.render('index', {title:'Rabbit Ears'})
}