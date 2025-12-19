import { useEffect, useState } from 'react';
import axios from 'axios';
import './Authors.css';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState(null); // for modal
  const [editData, setEditData] = useState({}); // for editing fields

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/authors');
        setAuthors(res.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleCardClick = (author) => {
    setSelectedAuthor(author);
    setEditData({
      firstName: author.firstName,
      lastName: author.lastName,
      description: author.description || '',
      image: author.image || ''
    });
  };

  const handleCloseModal = () => {
    setSelectedAuthor(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/authors/${selectedAuthor._id}`, editData);
      // Update the authors array locally
      setAuthors(authors.map(a => a._id === res.data._id ? res.data : a));
      setSelectedAuthor(res.data); // update modal
      alert('Author updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating author');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this author?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/authors/${selectedAuthor._id}`);
      setAuthors(authors.filter(a => a._id !== selectedAuthor._id));
      setSelectedAuthor(null);
      alert('Author deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting author');
    }
  };

  if (loading) return <p className="message">Loading authors...</p>;

  return (
    <>
      <div className="text">Meet Our Authors</div>

      <div className="card-container">
        {authors.map(author => (
          <div
            className="card"
            key={author._id}
            onClick={() => handleCardClick(author)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={author.image || '/default-author.jpg'}
              className="card-img-top"
              alt={`${author.firstName} ${author.lastName}`}
            />
            <div className="card-body text-center">
              <h5 className="card-title">
                {author.firstName} {author.lastName}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAuthor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Author</h2>
            <button className="close-btn" onClick={handleCloseModal}>×</button>

            <div className="modal-body">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleEditChange}
              />

              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleEditChange}
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={editData.image}
                onChange={handleEditChange}
              />

              <div className="modal-actions">
                <button onClick={handleUpdate} className="btn-update">Update</button>
                <button onClick={handleDelete} className="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
