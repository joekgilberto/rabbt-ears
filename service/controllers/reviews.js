//Imports User model and handleValidateOwnership middleware
const { Reviews } = require('../models')
const { handleValidateOwnership } = require('../middleware/auth');

//Exports review controllers
module.exports = {
    index,
    create,
    show,
    associated,
    users,
    delete: destroy,
    update,
    like
}

//Creates a function to show all reviews
async function index(req, res) {
    try {
        const allReviews = await Reviews.find();
        res.status(200).json(allReviews);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates a function to create a review
async function create(req, res) {
    try {
        req.body.owner = req.user._id;
        const newReview = await Reviews.create(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates a function to show a review
async function show(req, res) {
    try {
        const foundReview = await Reviews.findById(req.params.id);
        res.status(200).json(foundReview);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates a function to get reviews by their showId
async function associated(req, res) {
    try {
        const foundReviews = await Reviews.find({ showId: req.params.id });
        res.status(200).json(foundReviews);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates a function to get reviews by their owner
async function users(req, res){
    try {
        console.log(req.params.id)
        const ownedReviews = await Reviews.find({ owner: req.params.id });
        res.status(200).json(ownedReviews);
    } catch (error) {
        res.status(400).json(error);
    }
}

//Creates a function to destroy a review
async function destroy(req, res) {
    try {
        handleValidateOwnership(req, await Reviews.findById(req.params.id))
        const deletedReview = await Reviews.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedReview);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates a function to update a review
async function update(req, res) {
    try {
        handleValidateOwnership(req, await Reviews.findById(req.params.id))

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

async function like(req, res) {
    try {
        const originalReview = await Reviews.findById(req.params.id)
        const reviewCache = {...originalReview._doc, likes: req.body.likes}
        const updatedReview = await Reviews.findByIdAndUpdate(
            req.params.id,
            reviewCache,
            { new: true }
        )
        res.status(200).json(updatedReview)

    } catch (error) {
        res.status(400).json(error);
    }
};
