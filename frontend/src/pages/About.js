import './About.css';

export default function About() {
  return (
    <>
      {/* Banner */}
      <div className="about-banner">
        About Us
      </div>

      {/* About Section */}
      <section className="container-custom about-section">
        <div className="about-image">
          <img
            src="https://i.pinimg.com/736x/b3/50/28/b350280e26357ae37b2298c5c17a20f6.jpg"
            alt="ReadWise interface"
          />
        </div>

        <div className="about-text">
          <h2 className="title">Our Mission</h2>
          <p>
            Welcome to <strong>ReadWise</strong> — your intelligent companion for
            discovering, buying, and enjoying the best books tailored to your
            tastes.
            <br /><br />
            Whether you are passionate about novels, curious to discover a new
            author, or looking for a reading recommendation from readers like
            you, ReadWise guides you smartly.
            <br /><br />
            Explore our catalog, leave your reviews, create your wish list, and
            receive alerts on new releases and promotions related to your
            preferences.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom features-grid">
        <div className="feature-item">
          <img
            src="https://i.pinimg.com/736x/67/55/a2/6755a20e2464f8715f14a531cf4517db.jpg"
            alt="Search feature"
          />
          <p>Smart Book Search & Filter</p>
        </div>

        <div className="feature-item">
          <img
            src="https://i.pinimg.com/736x/f9/d2/02/f9d20234034a5253a582f272dea5c652.jpg"
            alt="AI feature"
          />
          <p>AI-Powered Recommendations</p>
        </div>

        <div className="feature-item">
          <img
            src="https://i.pinimg.com/736x/46/fb/e5/46fbe5b0ce958002fb66d9e5d7568236.jpg"
            alt="Reviews feature"
          />
          <p>Real-Time Review Analysis</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>ReadWise - Intelligent Book Platform © 2025</p>
      </footer>
    </>
  );
}
