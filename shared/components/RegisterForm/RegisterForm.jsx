import React, { Component, PropTypes } from 'react';

class RegisterForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser() {
    const usernameRef = this.refs.username;
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const password2Ref = this.refs.password2;
    if (usernameRef.value && emailRef.value && passwordRef.value && password2Ref.value && (passwordRef.value === password2Ref.value)) {
      this.props.registerUser(usernameRef.value, emailRef.value, passwordRef.value);
      usernameRef.value = emailRef.value = passwordRef.value = password2Ref.value = '';
    }
  }

  render() {
    const cls = `form ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className="register">
        <div className={cls}>
          <div className="form-content">
            <h2 className="form-title">Register</h2>
            <input placeholder="username" className="form-field" ref="username"/>
            <input placeholder="email" className="form-field" ref="email"/>
            <input type="password" placeholder="password" className="form-field" ref="password"/>
            <input type="password" placeholder="confirm password" className="form-field" ref="password2"/>
            <a className="btn btn-primary align-right" href="#" onClick={this.registerUser}>Register</a>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default RegisterForm;
