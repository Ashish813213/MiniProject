const mongoose = require('mongoose');

async function connect() { 
    return mongoose.connect('mongodb+srv://ashishsharma12549:RYdCpOGuEEJ5Iy3d@miniproject.7x3on.mongodb.net/?retryWrites=true&w=majority&appName=MiniProject');
    // ashishsharma12549
    // RYdCpOGuEEJ5Iy3d
}
module.exports = connect;


