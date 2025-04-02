import React from 'react';
import '../src/assets/Dashboard.css';
import axios from "axios"
import  { useState, useEffect } from "react";

const handlePayment = async () => {
    try {
        // Create order via backend
        const response = await axios.post('http://localhost:3001/user/create-order', {
            amount: 500, // Amount in rupees
            currency: 'INR',
        });

        const { id: order_id, amount, currency } = response.data;

        // Set up RazorPay options
        const options = {
            key: "rzp_test_MYbcSbMch66v2D", // Replace with your RazorPay Key ID
            amount: amount,
            currency: currency,
            name: "Library System",
            description: "Test Transaction",
            order_id: order_id,
            handler: (response) => {
                alert(`Payment Successful! Payment ID: ${ response.razorpay_payment_id }`);
            },
            prefill: {
                name: "Ashish Sharma",
                email: "Ashishsharma12549@gmail.com",
                contact: "9999999999",
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



const checkDUE = (dueDate) => {
    const CurrentDate = new Date();
    const dueDateint = new Date(dueDate);
    if (CurrentDate > dueDateint) {
        return true;
    }
    return false;

}
const BookCard = ({ title, author, dueDate , Url ,borrowedBy }) => (
    
    <div className="book-card">
        <div className="book-content">
            <img src= {Url} alt="Book cover" className="book-image" />
            <div className="book-details">
                <h4 className="book-title">{title}</h4>
                <p className="book-author">{author}</p>
                <p className="book-due">Due Date: {borrowedBy[0].returnDate}</p>
                <button className="renew-button">Renew</button>
                {checkDUE(borrowedBy[0].returnDate) && (
                    <>
                    {console.log(borrowedBy.returnDate + " " + dueDate)}
                        <button className="Pay-Fine" onClick={handlePayment}> Pay Fine</button>
                    </>
                )}

            </div>
        </div>
    </div>
);

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
            const userResponse = await axios.get(`http://localhost:3001/user/${id}`);
            setUser({
              name: userResponse.data.name,
              email: userResponse.data.email,
              Phone_no: userResponse.data.Phone_no,
            });
            // Fetch borrowed books
            const booksResponse = await axios.get(
              `http://localhost:3001/user/api/user/borrowed-books/${id}`
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
                            
                            <BookCard  key={book.id} {...book} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;