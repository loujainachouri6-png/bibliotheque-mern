import { useState } from 'react';
import './Home.css';
import Authors from './Authors';
import Books from './Books';
import About from './About';
import { Link } from 'react-router-dom';


export default function Home() {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'

  // Fonction pour changer le thème
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`home ${theme}`}> {/* applique la classe du thème */}
      {/* Bouton pour changer le thème */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {/* Promo Banner */}
      <div id="home" className="promo-banner">
        <div className="promo-text">
          <h1>Discover Your Next Favorite Book!</h1>
          <p>Explore a world of stories, colors, and adventures just a click away.</p>
        </div>
        <div className="promo-image">
          <img 
            src="https://i.pinimg.com/736x/1f/c6/06/1fc6066edbde7ce1e35209b9ec94736d.jpg" 
            alt="Cute Books Illustration" 
          />
        </div>
      </div>

      {/* Management Links */}
      <div className="management-links">
        <Link to="/books/add" className="management-link">Add Book</Link>
        <Link to="/authors/add" className="management-link">Add Author</Link>
      </div>

      {/* Sections */}
      <div id="books"><Books /></div>
      <div id="authors"><Authors /></div>
      <div id="about"><About /></div>
    </div>
  );
}