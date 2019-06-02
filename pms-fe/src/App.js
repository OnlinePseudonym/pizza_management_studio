import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import HomePage from './_pages/HomePage/HomePage';
import Toppings from './_pages/Toppings/Toppings';
import Pizzas from './_pages/Pizzas/Pizzas';
import Users from './_pages/Users/Users';

function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.user : null;

  return (
    <Router>
      <div className="App">
        <nav>
          <div>
            <Link to="/">Home</Link>
          </div>
          <ul>
            <li>
              <Link to="/users/">Users</Link>
            </li>
            {user && user.isManager && (
              <li>
                <Link to="/toppings/">Toppings</Link>
              </li>
            )}
            {user && !user.isManager && (
              <li>
                <Link to="/pizzas/">Pizzas</Link>
              </li>
            )}
          </ul>
        </nav>

        <Route path="/" exact component={HomePage} />
        <Route path="/users/" component={Users} />
        <Route path="/toppings/" component={Toppings} />
        <Route path="/pizzas/" component={Pizzas} />
      </div>
    </Router>
  );
}

export default App;
