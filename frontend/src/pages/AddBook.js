import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- for navigation
import './AddBook.css';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [authors, setAuthors] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // <-- hook to navigate programmatically

  // Fetch authors for dropdown
  useEffect(() => {
    axios.get('http://localhost:5000/api/authors')
      .then(res => setAuthors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !authorId || !price) {
      setMessage('Title, Author, and Price are required.');
      return;
    }

    try {
      const newBook = { title, image, description, author: authorId, genre, price: parseFloat(price) };
      await axios.post('http://localhost:5000/api/books', newBook);
      setMessage('Book added successfully!');
      setTitle(''); setImage(''); setDescription(''); setAuthorId(''); setGenre(''); setPrice('');
    } catch (err) {
      console.error(err);
      setMessage('Error adding book.');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>

      {/* Back to Home Button */}
<button
  className="back-home-button"
  onClick={() => navigate('/')}
>
  ← Back to Home
</button>


      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="add-book-form">
        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Image URL:</label>
        <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="http://example.com/image.jpg" />

        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows="5" />

        <label>Author:</label>
<select value={authorId} onChange={e => setAuthorId(e.target.value)} required>
  <option value="">Select an author</option>
  {authors.map(author => (
    <option key={author._id} value={author._id}>
      {author.firstName} {author.lastName}  {/* <- fix here */}
    </option>
  ))}
</select>

        <label>Genre:</label>
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />

        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.01" min="0" required />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
