import React, { Component, PropTypes } from 'react';

class GameHostView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const cls = `toggle ${(this.props.show ? 'appear' : '')}`;

    let activeParticipants = (<h2> NONE </h2>);
    let finishedParticipants = (<h2> NONE </h2>);
    let prompts = (<h2> NONE </h2>);
    const gameRef = this.props.game;
    if (this.props.show && Object.getOwnPropertyNames(this.props.game).length > 0) {
      activeParticipants = (
        <div> {(this.props.game.activeParticipants).map(u =>
          <div className="box2">
            {u.name}
          </div>
        )} </div>
      );
      finishedParticipants = (
        <div> {(this.props.game.finishedParticipants).map(u =>
          <div className="box2">
            <h4>{u.name}</h4>
            {u.answers.map((e, i) => {
              if (e === undefined) {
                return null;
              }
              return (
                <div key={i}>
                  {gameRef.options[i]}: {e}
                </div>
              );
            })}
          </div>
        ).filter((e) => {
          return e !== undefined;
        })} </div>
      );
      prompts = (
        <div> {(this.props.game.options).map(p =>
                <div className="box2">
                  {p}
                </div>
              )} </div>
      );
    }
    return (
      <div className={cls}>
        <h2> Currently Hosting Game: {this.props.game.name}. </h2>
        <a className="btn btn-primary" href="#" onClick={this.props.endGameClick}>End Game</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary" href="#" onClick={this.props.refresh}>Refresh Game State</a>
        <hr/>
        <div className="box">
          <h1> Active Participants </h1>
          {activeParticipants}
        </div>
        <div className="box">
          <h1> Finished Participants </h1>
          {finishedParticipants}
        </div>
        <div className="box">
          <h1> Prompts </h1>
          {prompts}
        </div>
      </div>

    );
  }
}

GameHostView.propTypes = {
  game: PropTypes.object.isRequired,
  approveUserClick: PropTypes.func.isRequired,
  rejectUserClick: PropTypes.func.isRequired,
  endGameClick: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default GameHostView;
