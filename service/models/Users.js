//Imports mongoose and destructures Schema from mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Creates User schema
const UserSchema = new Schema(
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

//Exports User model from UserSchema
module.exports = mongoose.model('User', UserSchema);
