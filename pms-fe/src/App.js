import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Header from './_components/Header';
import HomePage from './_pages/HomePage/HomePage';
import Toppings from './_pages/Toppings/Toppings';
import Pizzas from './_pages/Pizzas/Pizzas';
import Users from './_pages/Users/Users';

library.add(fab, faAngleDown, faSearch, faCog);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/users/" component={Users} />
        <Route path="/toppings/" component={Toppings} />
        <Route path="/pizzas/" component={Pizzas} />
      </div>
    </Router>
  );
}

export default App;
