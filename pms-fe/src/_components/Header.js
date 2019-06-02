import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.user : null;

  function logout() {
    localStorage.removeItem('user');
    window.location.assign('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>
      <div className="navbar-menu is-active">
        <ul className="navbar-start">
          <li className="navbar-item">
            <Link to="/users/">Users</Link>
          </li>
          {user && user.isManager && (
            <li className="navbar-item">
              <Link to="/toppings/">Toppings</Link>
            </li>
          )}
          {user && !user.isManager && (
            <li className="navbar-item">
              <Link to="/pizzas/">Pizzas</Link>
            </li>
          )}
        </ul>
        {user && (
          <ul className="navbar-end">
            <li className="navbar-item">
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;
