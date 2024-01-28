const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            maxLength: 12,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: 8,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model('User', UserSchema);
