const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index,
    show,
    random
}

async function index(req,res,next){
    let programs = [];
    let posters = [];
    const fourOhFours = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442];
    let used= [];
    while (posters.length < 5) {
        let rando = Math.floor(Math.random() * 500)
        let currentProgram = await fetch(`${Programs.root}/shows/${rando}`).then(res => res.json())
        let currentPoster = await fetch(`${Programs.root}/shows/${rando}/images`).then(res => res.json())

        if (!fourOhFours.includes(rando) && !used.includes(rando) && currentPoster[0].resolutions.original.width === 680 && currentPoster[0].resolutions.original.height === 1000) {
            programs.push(currentProgram)
            posters.push(currentPoster)
            used.push(rando)
        }
    }

    res.render('programs/index',{title:'Programs',style:'programs/index',programs,posters})
}

function show(req,res,next){
    const id = req.params.id
    res.send(`Welcome to the ${id} page!`)
}

function random(req,res,next){
    res.send('Welcome to a random program page!')
}