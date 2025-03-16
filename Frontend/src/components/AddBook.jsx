import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, settitle] = useState('');
  const [author, setauthor] = useState('');
  const [genre, setgenre] = useState('');
  const [image, setimage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image for the book.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title); // Use 'title' instead of 'name'
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/user/api/Addbook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book added:', response.data);
      setError(''); // Clear any previous errors
      alert('Book added successfully!');
      // Reset form fields
      settitle('');
      setauthor('');
      setgenre('');
      setimage(null);
    } catch (error) {
      console.error('There was an error adding the book!', error);
      setError('Failed to add the book. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Add Book</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Book Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

          {/* Book Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Book Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={author}
              onChange={(e) => setauthor(e.target.value)}
            />
          </div>

          {/* Book Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Book Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={genre}
              onChange={(e) => setgenre(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Book Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;