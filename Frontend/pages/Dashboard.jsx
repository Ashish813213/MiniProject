import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [booksTaken, setBooksTaken] = useState([]); // Separate state for borrowed books

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
        });

        // Fetch borrowed books
        const booksResponse = await axios.get(
          `http://localhost:3001/user/api/user/borrowed-books/${id}`
        );
        setBooksTaken(booksResponse.data.data); // Store borrowed books in state

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Name</h2>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Books Taken Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Books Taken</h2>
          {booksTaken.length > 0 ? (
            <div className="space-y-4">
              {booksTaken.map((book) => (
                <div
                  key={book._id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Return Date:</span> {book.borrowedBy[0].returnDate}
                  </p>
                  <img
                    src={book.Url}
                    alt={book.title}
                    className="mt-2 object-cover rounded-md shadow-sm"
                    style={{
                      width:"150px",
                      height:"200px"
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No books taken yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
