const { User } = require('../models')
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

module.exports = {
    register,
    login,
    logout,
    update,
    show
}

async function register(req, res, next) {
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



async function login(req, res, next) {
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

async function logout(req, res, next) {
    try {
        res.status(200).json({
            token: ''
        })

    } catch (err) {
        console.log(res.status(400).json({ error: err.message }));
    }
};

async function update(req, res, next) {
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

async function show(req, res, next) {
    try {
        const foundUser = await User.find({ username: req.params.id })
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json(error);
    }
};
