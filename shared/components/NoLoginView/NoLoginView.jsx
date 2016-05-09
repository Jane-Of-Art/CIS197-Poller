import React, { Component, PropTypes } from 'react';

class NoLoginView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const cls = `toggle ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className={cls}>
        <h2 className="form-title">Welcome! You are currently not logged in. </h2>
        <h3>Log in or Register to continue.</h3>
        <br/><br/>
        <a className="btn btn-primary" href="#" onClick={this.props.loginClick}>Log In</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary" href="#" onClick={this.props.registerClick}>Register</a>
        <br/><br/>
      </div>
    );
  }
}

NoLoginView.propTypes = {
  loginClick: PropTypes.func.isRequired,
  registerClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default NoLoginView;
