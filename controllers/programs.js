const fetch = require('node-fetch');
const Programs = require('../models/programs')

module.exports = {
    index
}

async function index(req,res,next){

    let previews = []
    let previewsImages = []

    for (let i=0; i<5; i++){
        let rando = Math.floor(Math.random()*250);
        preview = await fetch(`${Programs.root}/shows/${rando}`).then(res => res.json())
        previewImage = await fetch(`${Programs.root}/shows/${rando}/images`).then(res => res.json())

        async function check(p,pI){
            if(!pI[0] || !pI[0].resolutions){
                rando = Math.floor(Math.random()*250);
                p = await fetch(`${Programs.root}/shows/${rando}`).then(res => res.json())
                pI = await fetch(`${Programs.root}/shows/${rando}/images`).then(res => res.json())
                if (!pI[0] || !pI[0].resolutions){
                    check(p,pI)
                }
            }
        }
        
        check(preview,previewImage)

        previews.push(preview)
        previewsImages.push(previewImage)

    }

    res.render('index',{title:'rabbtEars', previews, previewsImages})
}