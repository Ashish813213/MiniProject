const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    BooksBorrowed: [
        {
            bookId: { type: String, required: true },
            returnDate: { type: String, required: true }
        }
    ]

  });

const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;