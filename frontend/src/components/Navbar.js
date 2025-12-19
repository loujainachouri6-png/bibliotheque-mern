// src/components/Navbar.js
import './Navbar.css';
import logo from './logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">

        <li>
          <div className="brand">
            <a href="#home">
              <img src={logo} alt="Brand Logo" className="logo" />
            </a>
          </div>
        </li>

        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#authors">Authors</a></li>
        <li><a href="#books">Books</a></li>

      </ul>
    </nav>
  );
}