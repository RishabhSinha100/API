import './Header.css';
import { Link } from 'react-router-dom'; // Import Link
import { useState } from 'react';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    console.log("heelo");
    document.body.classList.toggle('dark'); // Toggle the dark class on the body
  };

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          {/* Use Link component to navigate to the home page */}
          <h2 className="title">
            <Link to="/" className="title-link">Where in the world</Link>
          </h2>
          <p className="theme-change" onClick={toggleDarkMode}>
            <i className={`fa-regular fa-moon ${isDarkMode ? 'active' : ''}`}></i>&nbsp;&nbsp;Dark Mode
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
