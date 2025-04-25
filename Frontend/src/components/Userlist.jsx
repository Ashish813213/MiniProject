import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/user/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const calculateFine = (returnDate) => {
    const due = new Date(returnDate);
    const today = new Date();
    const diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 5 : 0; // ₹5/day fine
  };

  const generateWhatsAppMessage = (phoneNumber, bookId, fine, returnDate) => {
    const message = `Hello! You have a pending fine for the book with ID ${bookId}.
    Fine Amount: ₹${fine}
    Due Date: ${new Date(returnDate).toLocaleDateString()}
    Please settle your fine at your earliest convenience.`;
    return encodeURIComponent(message);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-purple-700 mb-6">📚 Library Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="py-3 px-5 border">👤 Name</th>
              <th className="py-3 px-5 border">📧 Email</th>
              <th className="py-3 px-5 border">📱 Phone</th>
              <th className="py-3 px-5 border">📘 Books Taken</th>
              <th className="py-3 px-5 border">📄 Book Details</th>
              <th className="py-3 px-5 border">📲 WhatsApp Reminder</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center hover:bg-purple-50 transition">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.Phone_no}</td>
                <td className="py-2 px-4 border">{user.BooksBorrowed.length}</td>
                <td className="py-2 px-4 border text-left">
                  {user.BooksBorrowed.length === 0 ? (
                    <span className="text-gray-500">No books borrowed</span>
                  ) : (
                    user.BooksBorrowed.map((book) => {
                      const fine = calculateFine(book.returnDate);
                      return (
                        <div
                          key={book._id}
                          className="mb-2 p-2 border border-purple-200 rounded bg-purple-50"
                        >
                          <p><strong>ID:</strong> {book.bookId}</p>
                          <p><strong>Due Date:</strong> {book.returnDate}</p>
                          <p><strong>Fine:</strong> ₹{fine}</p>
                          {fine > 0 && (
                            <a
                              href={`https://wa.me/${user.Phone_no}?text=${generateWhatsAppMessage(
                                user.Phone_no,
                                book.bookId,
                                fine,
                                book.returnDate
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Send WhatsApp Reminder
                            </a>
                          )}
                        </div>
                      );
                    })
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {user.BooksBorrowed.some(book => calculateFine(book.returnDate) > 0) && (
                    <a
                      href={`https://wa.me/${user.Phone_no}?text=${generateWhatsAppMessage(
                        user.Phone_no,
                        user.BooksBorrowed[0].bookId, // Use the first book ID for the message
                        calculateFine(user.BooksBorrowed[0].returnDate),
                        user.BooksBorrowed[0].returnDate
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Send Reminder for All Pending Fines
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
