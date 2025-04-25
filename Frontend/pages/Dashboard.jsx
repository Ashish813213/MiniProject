import React from 'react';
import '../src/assets/Dashboard.css';
import axios from "axios"
import  { useState, useEffect } from "react";

const handlePayment = async (fineAmount ,user , bookId) => {
    try {
        // Create order via backend
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/create-order`, {
            amount: fineAmount, // Amount in rupees
            currency: 'INR',
        });

        const { id: order_id, amount, currency } = response.data;

        // Set up RazorPay options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your RazorPay Key ID
            amount: amount,
            currency: currency,
            name: "Library System",
            description: "Test Transaction",
            order_id: order_id,
            handler: async (response) => {
                alert(`Payment Successful! Payment ID: ${ response.razorpay_payment_id } ${bookId}`);
                removeBook(bookId); // Call removeBook function after successful payment
            },
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.Phone_no,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error('Payment initiation failed:', error);
    }
};

const removeBook = async (bookId) => {
  let userId =  localStorage.getItem("userId")
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/api/useremoveBook`, {
          userId: userId,
          bookId: bookId
        });
        console.log('Book removed:', response.data);

    } catch (error) {
        console.error('Error removing book:', error);
    }
};
      

const checkDUE = (dueDate) => {
    const CurrentDate = new Date();
    const dueDateint = new Date(dueDate);
    if (CurrentDate > dueDateint) {
        return true;
    }
    return false;

}

const calculateFine = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = now - due;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays * 5 : 0; // ₹5 fine per day
};


const BookCard = ({ _id, title, author, dueDate, Url, borrowedBy , user }) => {
  const returnDate = borrowedBy[0]?.returnDate;
  const isOverdue = checkDUE(returnDate);
  const fineAmount = calculateFine(returnDate);

  return (
      <div className="book-card">
          <div className="book-content">
              <img src={Url} alt="Book cover" className="book-image" />
              <div className="book-details">
                  <h4 className="book-title">{title}</h4>
                  <p className="book-author">{author}</p>
                  <p className="book-due">Due Date: {returnDate}</p>
                  {!isOverdue && (
                        <button className="renew-button">Renew</button>
                    )}

                    {isOverdue && (
                        <>  
                        {console.log(_id)}
                            <p className="fine-amount">Fine: ₹{fineAmount}</p>
                            <button className="Pay-Fine" onClick={() => handlePayment(fineAmount , user, _id)}>Pay Fine</button>
                        </>
                    )}
              </div>
          </div>
      </div>
  );
};


const Dashboard = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        Phone_no: "",
      });
      const [booksTaken, setBooksTaken] = useState([]); // Separate state for borrowed books
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const id = localStorage.getItem("userId");
            if (!id) {
              console.log("No user ID found in localStorage.");
              return;
            }
            // Fetch user details
            const userResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${id}`);
            setUser({
              name: userResponse.data.name,
              email: userResponse.data.email,
              Phone_no: userResponse.data.Phone_no,
            });
            // Fetch borrowed books
            const booksResponse = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/user/api/user/borrowed-books/${id}`
            );
            setBooksTaken(booksResponse.data.data); // Store borrowed books in state
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
      }, []);
    
      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-8 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-700">Loading...</p>
            </div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-8 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-red-500">Error fetching data: {error.message}</p>
            </div>
          </div>
        );
      }


    return (
        <div className="dashboard">

            <main className="main-content">
                <div className="profile-card">
                    <div className="profile-info">
                        <div className="avatar">
                            <span>AS</span>
                        </div>
                        <div className="user-info">
                            <h2>{user.name}</h2>
                            <p>{user.Phone_no}</p>
                            <p>{user.email}</p>
                            <p>Member since: January 2024</p>
                            <p>Books borrowed: {booksTaken.length}</p>
                        </div>
                    </div>
                </div>

                <div className="books-section">
                    <h3>Currently Borrowed Books</h3>
                    <div className="books-grid">
                        {console.log(booksTaken)}
                        {booksTaken.map(book => (
                            <>
                            <BookCard  key={book.id} {...book} user={user} />
                            </>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;