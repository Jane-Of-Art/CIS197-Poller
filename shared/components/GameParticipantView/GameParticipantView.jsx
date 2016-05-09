import React, { Component, PropTypes } from 'react';

class GameParticipantView extends Component {
  constructor(props, context) {
    super(props, context);
    this.saveGame = this.saveGame.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  saveGame() {
    let submission = [];
    let i = 0;
    for (i = 0; i < this.props.user.currentGameState.length; i++) {
      submission.push({ prompt: this.props.user.currentGameState[i].prompt, solution: this.refs[('prompt' + i)].value });
    }
    this.props.saveGame(submission);
  }

  finishGame() {
    let submission = [];
    let i = 0;
    for (i = 0; i < this.props.user.currentGameState.length; i++) {
      submission.push(this.refs[('prompt' + i)].value);
    }
    this.props.finishGame(submission);
  }

  render() {
    const cls = `toggle ${(this.props.show ? 'appear' : '')}`;
    const formCls = `form ${(this.props.show ? 'appear' : '')}`;

    let tiles = (<h2> NONE </h2>);
    if (Object.getOwnPropertyNames(this.props.user).length > 0) {
      tiles = (
        <div className={formCls}>
          {(this.props.user.currentGameState).map((e, i) => {
            if (e === undefined) {
              return null;
            }

            const refName = 'prompt' + i;
            return (
              <div key={i}>
                <h4> {e.prompt} </h4>
                <input placeholder="answer" className="form-field align-right" ref={refName} id={refName} defaultValue={e.solution}/>
              </div>
            );
          }).filter((e) => {
            return e !== undefined;
          })}
          <a className="btn btn-primary align-right" href="#" onClick={this.saveGame}>Save</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a className="btn btn-primary align-right" href="#" onClick={this.finishGame}>Submit</a>
        </div>
      );
    }
    return (
      <div className={cls}>
        <h2> Currently Participating in Game: {this.props.game.name}. </h2>
        <h4> Host: {this.props.game.host}. </h4>
        <a className="btn btn-primary" href="#" onClick={this.props.leaveGame}>Leave Game</a>
        <hr/>
        <div>
          <h1> Poll </h1>
          {tiles}
        </div>
      </div>

    );
  }
}

GameParticipantView.propTypes = {
  game: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  leaveGame: PropTypes.func.isRequired,
  saveGame: PropTypes.func.isRequired,
  finishGame: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default GameParticipantView;
