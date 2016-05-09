import React, { Component, PropTypes } from 'react';

class InactiveView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const cls = `toggle ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className={cls}>
        <h2 className="form-title">Welcome! You are not currently in a game. </h2>
        <h3>Create or join a game to begin.</h3>
        <br/><br/>
        <a className="btn btn-primary" href="#" onClick={this.props.joinGameClick}>Join an Existing Game</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary" href="#" onClick={this.props.createGameClick}>Create a New Game</a>
        <br/><br/>
      </div>
    );
  }
}

InactiveView.propTypes = {
  createGameClick: PropTypes.func.isRequired,
  joinGameClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default InactiveView;
