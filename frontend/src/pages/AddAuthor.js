import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import useNavigate
import axios from 'axios';
import './AddAuthor.css'; // optional, you can reuse AddBook.css for consistency

export default function AddAuthor() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // <-- initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setMessage('First name and last name are required.');
      return;
    }

    try {
      const newAuthor = { firstName, lastName, image, description };
      await axios.post('http://localhost:5000/api/authors', newAuthor);

      setMessage('Author added successfully!');
      setFirstName('');
      setLastName('');
      setImage('');
      setDescription('');
    } catch (error) {
      console.error(error);
      setMessage('Error adding author.');
    }
  };

  return (
    <div className="add-author-container">
      {/* Back to Home button */}
      <button
        className="back-home-button"
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Home
      </button>

      <h2 className="text">Add a New Author</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="add-author-form">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />

        <label>Author Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="http://example.com/author.jpg"
        />

        <label>Description:</label>
        <textarea
          rows="5"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Write a short biography or description..."
        />

        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}
