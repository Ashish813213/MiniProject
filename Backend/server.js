const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const connectDB  = require('./connection');
const UserRouter = require('./routes/User')


const app = express();
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());

  connectDB().then(() => {
    console.log('Connected to MongoDB');
  });


app.use('/user', UserRouter);
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});