import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Authors from './pages/Authors';
import AddBook from './pages/AddBook';
import AddAuthor from './pages/AddAuthor';


function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  // Only show navbar on Home, About, Books, Authors pages
  const showNavbar = location.pathname === '/' 
                  || location.pathname === '/about' 
                  || location.pathname === '/books' 
                  || location.pathname === '/authors';

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/authors/add" element={<AddAuthor />} />

      </Routes>
    </>
  );
}

export default AppWrapper;
