import { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); 
  const [editData, setEditData] = useState({}); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAuthors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/authors');
        setAuthors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
    fetchAuthors();
  }, []);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setEditData({
      title: book.title,
      description: book.description || '',
      price: book.price || 0,
      image: book.image || '',
      author: book.author?._id || '',
    });
  };

  const handleCloseModal = () => setSelectedBook(null);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/books/${selectedBook._id}`,
        editData
      );
      setBooks(books.map(b => b._id === res.data._id ? res.data : b));
      setSelectedBook(res.data);
      alert('Book updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating book');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/books/${selectedBook._id}`);
      setBooks(books.filter(b => b._id !== selectedBook._id));
      setSelectedBook(null);
      alert('Book deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting book');
    }
  };

  // Filter books
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="text">Explore Books</div>

      <div className="card-container">
        {filteredBooks.map(book => (
          <div
            className="card"
            key={book._id}
            onClick={() => handleCardClick(book)}
            style={{ cursor: 'pointer' }}
          >
            <img className="card-img-top" src={book.image} alt={book.title} />
            <div className="card-body">
              <h3 className="card-title">{book.title}</h3>
              <p className="card-text">{book.price} €</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Book</h2>
            <button className="close-btn" onClick={handleCloseModal}>×</button>

            <div className="modal-body">
              <label>Title:</label>
              <input type="text" name="title" value={editData.title} onChange={handleEditChange} />

              <label>Description:</label>
              <textarea name="description" value={editData.description} onChange={handleEditChange} />

              <label>Price:</label>
              <input type="number" name="price" value={editData.price} onChange={handleEditChange} />

              <label>Image URL:</label>
              <input type="text" name="image" value={editData.image} onChange={handleEditChange} />

              <label>Author:</label>
              <select name="author" value={editData.author} onChange={handleEditChange}>
                <option value="">Select an author</option>
                {authors.map(a => (
                  <option key={a._id} value={a._id}>
                    {a.firstName} {a.lastName}
                  </option>
                ))}
              </select>

              <div className="modal-actions">
                <button onClick={handleUpdate} className="btn-update">Update</button>
                <button onClick={handleDelete} className="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
