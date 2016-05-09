import React, { Component, PropTypes } from 'react';

class JoinGameForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    const hostnameRef = this.refs.hostname;
    if (hostnameRef.value) {
      this.props.joinGame(hostnameRef.value);
      hostnameRef.value = '';
    }
  }

  render() {
    const cls = `form ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className="join-game">
        <div className={cls}>
          <div className="form-content">
            <h2 className="form-title">Join Existing Game</h2>
            <input placeholder="Host Name" className="form-field" ref="hostname"/>
            <a className="btn btn-primary align-right" href="#" onClick={this.joinGame}>Join Game</a>
          </div>
        </div>
      </div>
    );
  }
}

JoinGameForm.propTypes = {
  joinGame: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default JoinGameForm;
