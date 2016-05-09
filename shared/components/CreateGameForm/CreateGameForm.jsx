import React, { Component, PropTypes } from 'react';

class CreateGameForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.createGame = this.createGame.bind(this);
  }

  createGame() {
    const gamenameRef = this.refs.gamename;
    const promptsRef = this.refs.prompts;
    if (gamenameRef.value && promptsRef.value && (promptsRef.value.split('\n').length > 1)) {
      this.props.createGame(gamenameRef.value, promptsRef.value);
      gamenameRef.value = promptsRef.value = '';
    }
  }

  render() {
    const cls = `form ${(this.props.show ? 'appear' : '')}`;
    return (
      <div className="create-game">
        <div className={cls}>
          <div className="form-content">
            <h2 className="form-title">Create New Game</h2>
            <input placeholder="Game Name" className="form-field" ref="gamename"/>
            <textarea placeholder="Game Prompts, new line separated. Trailing commas and whitespace will not be removed. Minimum 9 options."
              className="form-field" ref="prompts"
            ></textarea>
            <a className="btn btn-primary align-right" href="#" onClick={this.createGame}>Create Game</a>
          </div>
        </div>
      </div>
    );
  }
}

CreateGameForm.propTypes = {
  createGame: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default CreateGameForm;
