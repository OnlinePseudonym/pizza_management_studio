import React from 'react';

import LoginPage from './_components/LoginPage';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem('user')) return;

    this.setState({
      user: JSON.parse(localStorage.getItem('user')).data.user
    });
  }

  logout() {
    localStorage.removeItem('user');
    window.location.assign('/');
  }

  render() {
    const { user } = this.state;

    return localStorage.getItem('user') ? (
      <div className="section">
        <h1>Welcome {user.email}!</h1>
      </div>
    ) : (
      <LoginPage />
    );
  }
}

export default HomePage;
