const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    showId: { type: Number, required: true },
    postingDate: {
        type: Number,
        required: true,
        default: new Date()
    },
    fav: {
        type: Boolean,
        required: true,
        default: false
    },
    tags: {
        type: Array,
        required: true,
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

module.exports = mongoose.model("Review", ReviewSchema);