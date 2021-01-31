import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

const User = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

User.set('toJSON', {
    transform: function(doc, ret, options) {
        const json = {
            firstName: ret.firstName,
            lastName: ret.lastName,
            email: ret.email,
            createdAt: ret.createdAt
        };
        return json;
    }
});

export default mongoose.model('user', User);
