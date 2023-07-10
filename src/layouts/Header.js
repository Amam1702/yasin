import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="#" className="nav-link">Contact</a>
      </li>
    </ul> */}
    <ul className="navbar-nav ml-auto">
    
      <li className="nav-item">
        <button type="button" onClick={handleLogout} className="btn-sm btn btn-outline-danger logout-btn">
          Logout 
        </button>
      </li>
    </ul>
  </nav>
  );
};

export default Header;