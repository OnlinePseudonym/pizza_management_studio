import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loginService from '../../../_services/login.service';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    loginService.logout();

    this.state = {
      email: '',
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
    const { email, password } = this.state;

    if (!(email && password)) {
      return;
    }

    this.setState({ loading: true });
    loginService
      .login(email, password)
      .then(
        user => window.location.assign('/'),
        error => this.setState({ error: JSON.stringify(error), loading: false })
      );
  }

  render() {
    const { email, password, submitted, loading, error } = this.state;
    if (error) {
      console.log(error);
    }

    return (
      <div>
        <div>
          email: {email}
          <br />
          Password: {password}
        </div>
        <h2>Login</h2>
        <form name="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email && <div>Email is required</div>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div>Password is required</div>}
          </div>
          <div>
            <button disabled={loading}>Login</button>
            {loading && <FontAwesomeIcon icon="cog" spin />}
          </div>
          {error && <div>{error}</div>}
        </form>
      </div>
    );
  }
}

export default LoginPage;
