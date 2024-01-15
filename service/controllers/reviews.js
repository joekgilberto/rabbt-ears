const { Reviews } = require('../models')
const { handleValidateOwnership } = require('../middleware/auth');

module.exports = {
    index,
    create,
    show,
    delete: destroy,
    update
}

async function index(req, res, next) {
    try {
        const allReviews = await Reviews.find();
        res.status(200).json(allReviews);
    } catch (error) {
        res.status(400).json(error);
    }
};

async function create(req, res, next) {
    try {
        const newReview = await Reviews.create(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

async function show(req, res, next) {
    try {
        const foundReview = await Reviews.findById(req.params.id);
        res.status(200).json(foundReview);
    } catch (error) {
        res.status(400).json(error);
    }
};

async function destroy(req, res, next) {
    try {
        handleValidateOwnership(req, await Reviews.findById(req.params.id))

        const deletedReview = await Reviews.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedReview);
    } catch (error) {
        res.status(400).json(error);
    }
};

async function update(req, res, next) {
    try {
        // handleValidateOwnership(req, await Reviews.findById(req.params.id))

        const updatedReview = await Reviews.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedReview)

    } catch (error) {
        res.status(400).json(error);
    }
};

