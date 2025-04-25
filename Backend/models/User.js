const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    phone_no: {
        type: String,
        required: false,
        unique: false
    },
    BooksBorrowed: [
        {
            bookId: { type: String, required: true },
            returnDate: { type: String, required: true }
        }
    ]
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
