import React from 'react';

import './App.css';
import LoginPage from './_pages/LoginPage/LoginPage';
import HomePage from './_pages/HomePage/HomePage';

function App() {
  return <div className="App">{localStorage.getItem('user') ? <HomePage /> : <LoginPage />}</div>;
}

export default App;
