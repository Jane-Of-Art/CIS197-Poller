import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.loginUser(usernameRef.value, passwordRef.value);
      usernameRef.value = passwordRef.value = '';
    }
  }

  render() {
    const cls = `form ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className="login">
        <div className={cls}>
          <div className="form-content">
            <h2 className="form-title">Log In</h2>
            <input placeholder="username" className="form-field" ref="username"/>
            <input type="password" placeholder="password" className="form-field" ref="password"/>
            <a className="btn btn-primary align-right" href="#" onClick={this.loginUser}>Log In</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginForm;
