import React from 'react';

import { userService } from '../../_services/user.service';
import Loading from '../../_components/_images/loading';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    userService
      .login(username, password)
      .then(user => window.location.assign('/'), error => this.setState({ error, loading: false }));
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;
    if (error) {
      console.log(error);
    }

    return (
      <div>
        <div>
          Username: {username}
          <br />
          Password: {password}
        </div>
        <h2>Login</h2>
        <form name="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username && <div>Username is required</div>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div>Password is required</div>}
          </div>
          <div>
            <button disabled={loading}>Login</button>
            {loading && <Loading />}
          </div>
          {error && <div>{error}</div>}
        </form>
      </div>
    );
  }
}

export default LoginPage;
