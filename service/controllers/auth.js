//Imports User model, bycrypt, and createUserToken middleware
const { User } = require('../models')
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

//Exports auth controllers
module.exports = {
    register,
    login,
    logout,
    update,
    show,
    follow,
    unfollow
}

//Creates function to register user
async function register(req, res) {
    try {

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const cachedPW = req.body.password;

        req.body.password = passwordHash;

        const newUser = await User.create(req.body);

        if (newUser) {
            req.body.password = cachedPW;
            const authenticatedUserToken = await createUserToken(req, newUser);

            res.status(201).json({
                user: newUser,
                token: authenticatedUserToken,
            });
        } else {
            throw new Error('Something went wrong')
        }
    } catch (err) {
        console.log(res.status(400).json({ error: err.message }));
    }
};


//Creates function to login user
async function login(req, res) {
    try {
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);

        res.status(200).json({
            user: foundUser,
            token,
        });

    } catch (err) {
        console.log(res.status(401).json({ error: err.message }));
    }
}

//Creates function to logout user
async function logout(req, res) {
    try {
        res.status(200).json({
            token: ''
        })

    } catch (err) {
        console.log(res.status(400).json({ error: err.message }));
    }
};

//Creates function to update a user's credentials
async function update(req, res) {
    try {
        if (req.user._id.equals(req.body._id)) {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            res.status(200).json(updatedUser)
        }

    } catch (error) {
        res.status(400).json(error);
    }
};

//Creates function to show a user's details found by username
async function show(req, res) {
    try {
        const foundUser = await User.find({ username: req.params.id })
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

async function follow(req, res) {
    try {
        const followedUser = await User.findById(req.params.id)

        const followersCache = [...followedUser.followers, req.body.follower]

        const updatedUserInfo = { ...followedUser._doc, followers: [...followersCache] }
        const returnedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedUserInfo,
            { new: true }
        )
        res.status(200).json(returnedUser)
    } catch (error) {
        res.status(400).json(error);
    }
};

async function unfollow(req, res) {
    try {
        const followedUser = await User.findById(req.params.id)
        const followersCache = [...followedUser.followers]

        const unfollowIdx = followersCache.findIndex((f) => f === req.body.follower);
        followersCache.splice(unfollowIdx, 1)

        const updatedUserInfo = { ...followedUser._doc, followers: [...followersCache] }
        const returnedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedUserInfo,
            { new: true }
        )
        res.status(200).json(returnedUser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
};
