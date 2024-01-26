const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        minimum: 0,
        maximum: 5,
        required: true
    },
    review: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    showId: { type: Number, required: true },
    fav: {
        type: Boolean,
        default: false
    },
    tags: {
        type: Array,
        default: []
    },
    username: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);