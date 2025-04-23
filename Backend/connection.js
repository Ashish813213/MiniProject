const mongoose = require('mongoose');
require('dotenv').config();

async function connect() { 
    return mongoose.connect(process.env.MONGODB_URI);
    // ashishsharma12549
    // RYdCpOGuEEJ5Iy3d
}
module.exports = connect;


