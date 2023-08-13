const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index
}

async function index(req, res, next) {
    let posters = []
    const fourOhFours = [0, 17, 36, 85, 113, 119, 121, 135, 173, 223, 264, 381, 389, 441, 442]
    while (posters.length < 50) {
        let rando = Math.floor(Math.random() * 500)
        let current = await fetch(`${Programs.root}/shows/${rando}/images`).then(res => res.json())

        if (!fourOhFours.includes(rando)) {
            posters.push(current)
        }
    }

    res.render('index', { title: 'Rabbit Ears', posters })
}