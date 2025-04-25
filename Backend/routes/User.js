const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb'); 
const UserModel = require('../models/User'); 
const BookModel = require('../models/book');
const AdminModel = require('../models/Admin');
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Razorpay = require("razorpay");


router.post('/register', async (req, res) => {
    try {
        const { name , email, password, Phone_no} = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            Phone_no,
        });

        res.status(201).send(newUser);
        console.log('User registered:', newUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }

        res.status(200).json(user._id);
        console.log(user._id);
        console.log('Login successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/adminLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AdminModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }
        res.status(200).send('Admin login successful');
        console.log('Admin login successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Ensure id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format");
        }

        const user = await UserModel.findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/api/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/api/Addbook', upload.single('image'), async (req, res) => {
    try {
      const { title, author, genre } = req.body;
  
      // Check if an image file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file uploaded',
        });
      }
  
      // Upload image to Cloudinary
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return res.status(500).json({
            success: false,
            message: 'Error uploading image to Cloudinary',
          });
        }
        console.log('Cloudinary result:', result);
        const newBook = await BookModel.create({
          title,
          author,
          genre,
          Url: result.secure_url, // Save the Cloudinary URL
        });
  
        // Send success response
        res.status(201).json({
          success: true,
          message: 'Book added successfully!',
          data: newBook,
        });
  
        console.log('Book added:', newBook);
      });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: err.message,
      });
    }
  });


router.get('/getBook/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await BookModel.findOne({ _id: new ObjectId(id) });
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send(err.message);  
    }
});

router.get("/api/getBooks", async (req, res) => {
    console.log("getBooks route hit"); // Debugging
    try {
        const books = await BookModel.find({});
        console.log("Books fetched:", books); // Debugging
        res.status(200).send(books);
    } catch (err) {
        console.error("Error fetching books:", err); // Debugging
        res.status(500).send(err.message);
    }
});

router.get('/api/getUserBooks', async (req, res) => {
    try {
      const bookIds = req.query.bookIds.split(',').map(id => id.trim());
      const books = await BookModel.find({ _id: { $in: bookIds } });
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found' });
      }
  
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  router.put('/BorrowBook', async (req, res) => {
    const { userId, itemId, returnDate } = req.body;
  
    try {
      // Validate userId and itemId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      if (!ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: 'Invalid book ID' });
      }
  
      // Find the user and book
      const user = await UserModel.findById(userId);
      const book = await BookModel.findById(itemId);

      console.log('User:', user);
      console.log('Book:', book);
  
      // Check if user and book exist
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Add the book to the user's BooksBorrowed array
      const userUpdateResult = await UserModel.updateOne(
        { _id: userId },
        { $push: { BooksBorrowed: { bookId: itemId, returnDate } } } // Use bookId as per UserSchema
      );
  
      // Add the user to the book's borrowedBy array
      const bookUpdateResult = await BookModel.updateOne(
        { _id: itemId },
        { $push: { borrowedBy: { userId, returnDate } } } // Use userId as per BookSchema
      );
  
      console.log('User Update Result:', userUpdateResult);
      console.log('Book Update Result:', bookUpdateResult);
  
      // Send success response
      res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  });


router.get('/api/user/borrowed-books/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Extract book IDs from the BooksBorrowed array
      const bookIds = user.BooksBorrowed.map((book) => book.bookId);
      
      // Fetch the books using the book IDs
      const borrowedBooks = await BookModel.find({ _id: { $in: bookIds } });
      console.log(bookIds );
      // Send the response
      res.status(200).json({
        success: true,
        message: 'Borrowed books fetched successfully',
        data: borrowedBooks,
      });
    } catch (err) {
      console.error('Error fetching borrowed books:', err);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: err.message,
      });
    }
  });


  router.post('/create-order', async (req, res) => {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency } = req.body;
    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
})

  router.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", "rBIpnF3m899kIRGvlWOZVKBS");
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });

router.post("/api/removeBook", async (req, res) => {
    const { bookId } = req.body; // Extract bookId from the request body

    try {
        // Find the book by ID and remove it
        const deletedBook = await BookModel.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book removed successfully', deletedBook });
    } catch (error) {
        console.error('Error removing book:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/api/userRemoveBook', async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { BooksBorrowed: { bookId } } },
            { new: true }
        );
        res.status(200).json({ message: 'Book removed from user successfully', updatedUser });
    } catch (error) {
        console.error('Error removing book from user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/api/useremoveBook', async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
      return res.status(400).json({ error: 'userId and bookId are required' });
  }

  try {
      const user = await UserModel.findById(userId);
      console.log('User document:', user);
      const book = await BookModel.findById(bookId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      user.BooksBorrowed = user.BooksBorrowed.filter(book => book.bookId !== bookId);
      book.borrowedBy = book.borrowedBy.filter(borrower => borrower.userId !== userId);
      console.log('Filtered BooksBorrowed:', user.BooksBorrowed);
      console.log('Updated BooksBorrowed:', user.BooksBorrowed);
      await book.save();
      await user.save();

      res.json({ message: 'Book removed successfully', user });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'An error occurred while removing the book: ' + error.message });
  }
});


module.exports = router;