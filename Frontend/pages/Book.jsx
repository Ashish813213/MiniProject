import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddBook from '../src/components/AddBook';
import { CartContext } from '../context/context';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/user/api/getBooks')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`${book.title} has been added to the cart!`);
  };

  const userRole = localStorage.getItem('role');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className="containerBooks"
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="cardS"
            style={{ width: '250px', padding: '12px', margin: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
          >
            <div className="imgC" style={{ width: '200px', height: '250px' }}>
              <img
                src={book.Url}
                alt={book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            <div className="DescriptionC" style={{ textAlign: 'center', marginTop: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{book.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>{book.description}</p>
              <button
                style={{ background: '#4f46e5', padding: '12px 8px', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => handleAddToCart(book)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <button
          style={{ display: 'block', margin: '20px auto', padding: '12px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => navigate('/cart')}
        >
          Next
        </button>
      )}

      {userRole === 'admin' && <AddBook />}
    </>
  );
};

export default Book;
