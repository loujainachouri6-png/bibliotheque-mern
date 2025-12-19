import { Link } from 'react-router-dom';
import './AuthorCard.css';

export default function AuthorCard({ author }) {
  return (
    <div className="author-card">
      {author.image && (
        <img
          src={`http://localhost:5000/uploads/${author.image}`}
          alt={author.firstName}
        />
      )}
      <h3>{author.firstName} {author.lastName}</h3>
      <Link to={`/authors/${author._id}`}>View profile</Link>
    </div>
  );
}
