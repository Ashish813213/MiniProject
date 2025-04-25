import React, { useState } from 'react';
import { useCart } from '../context/context';
import Modal from 'react-modal';
import axios from "axios";
import "./Carting.css";

const Cart = () => {
  const { cart = [], removeFromCart } = useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [borrowModalIsOpen, setBorrowModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [returnDate, setReturnDate] = useState('');

  const openRemoveModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const openBorrowModal = (item) => {
    setSelectedItem(item);
    setBorrowModalIsOpen(true);
  };

  const closeRemoveModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const closeBorrowModal = () => {
    setSelectedItem(null);
    setBorrowModalIsOpen(false);
    setReturnDate('');
  };

  const handleRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem._id);
    }
    closeRemoveModal();
  };

  const handleBorrow = () => {
    if (selectedItem && returnDate) {
      const userId = localStorage.getItem("userId");
      console.log(userId);
      borrowBook(userId, selectedItem._id, returnDate); 
      handleRemove(); 
      closeBorrowModal();
    }
  };

  const borrowBook = (userId, itemId, returnDate) => {
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/user/BorrowBook`, { userId, itemId, returnDate })
      .then((response) => {
        console.log('Book borrowed successfully:', response.data);
        console.log('Borrowed book with ID:', itemId, 'Return Date:', returnDate);
      })
      .catch((error) => {
        console.error('Error borrowing book:', error);
  
        if (error.response) {

          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {

          console.error('No response received:', error.request);
        } else {

          console.error('Error:', error.message);
        }
  

        alert('Failed to borrow the book. Please try again.');
      });
  };
  return (
    <>
      <div>
        <div className='titleC'>
          <h1>Your Cart</h1>
          <div className='ContainerC'>

          {cart.length === 0 ? (
            <div>
              <p>Your cart is empty.</p>
              <p>Add some items to get started!</p>
            </div>
          ) : (
            <div className='CardC'>
              {cart.map((item) => (
                <div className='Card' key={item._id}>
                  <img src={item.Url} alt={item.title} />
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <div className='ButtonC'>
                      <button style={{background:"red"}} onClick={() => openRemoveModal(item)}>Remove</button>
                      <button  style={{background:"green"}}onClick={() => openBorrowModal(item)}>Borrow</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeRemoveModal}
      >
        <div className='Cancel PopUP'>
          <h2>Confirm Removal</h2>
          <p>
            Are you sure you want to remove <span>"{selectedItem?.title}"</span> from your cart?
          </p>
          <div>
            <button onClick={closeRemoveModal}>Cancel</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={borrowModalIsOpen}
        onRequestClose={closeBorrowModal}
      >
        <div className='Borrow PopUP'>
          <h2>Select Return Date</h2>
          <p>
            Please select a return date for <span>"{selectedItem?.title}"</span>.
          </p>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
          <div>
            <button onClick={closeBorrowModal}>Cancel</button>
            <button onClick={handleBorrow} disabled={!returnDate}>
              Confirm Borrow
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
