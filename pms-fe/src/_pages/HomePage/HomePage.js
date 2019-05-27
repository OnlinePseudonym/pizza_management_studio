import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
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

    return (
      <div>
        <h1>Welcome {user.email}!</h1>
        {user.isManager ? console.log('Manager ') : console.log('Not Manager')}
        <p>
          <button onClick={this.logout}>Logout</button>
        </p>
      </div>
    );
  }
}

export default HomePage;
