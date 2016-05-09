import React, { PropTypes, Component } from 'react';

import NoLoginView from '../../components/NoLoginView/NoLoginView';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import InactiveView from '../../components/InactiveView/InactiveView';
import JoinGameForm from '../../components/JoinGameForm/JoinGameForm';
import CreateGameForm from '../../components/CreateGameForm/CreateGameForm';

import GameHostView from '../../components/GameHostView/GameHostView';
import GameParticipantView from '../../components/GameParticipantView/GameParticipantView';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLoginForm: false,
      showRegisterForm: false,
      showCreateGameForm: false,
      showJoinGameForm: false,
    };

    // click handlers
    this.loginClick = this.loginClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
    this.createGameClick = this.createGameClick.bind(this);
    this.joinGameClick = this.joinGameClick.bind(this);

    // user actions
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);

    // host actions
    this.createGame = this.createGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.approveParticipant = this.approveParticipant.bind(this);
    this.rejectParticipant = this.rejectParticipant.bind(this);

    // participant actions
    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.finishGame = this.finishGame.bind(this);

    this.isInGame = this.isInGame.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  loginClick(e) {
    this.setState({
      showLoginForm: !this.state.showLoginForm,
      showRegisterForm: this.state.showLoginForm && this.state.showRegisterForm,
    });

    e.preventDefault();
  }

  registerClick(e) {
    this.setState({
      showRegisterForm: !this.state.showRegisterForm,
      showLoginForm: this.state.showRegisterForm && this.state.showLoginForm,
    });

    e.preventDefault();
  }

  createGameClick(e) {
    this.setState({
      showCreateGameForm: !this.state.showCreateGameForm,
      showJoinGameForm: this.state.showCreateGameForm && this.state.showJoinGameForm,
    });

    e.preventDefault();
  }

  joinGameClick(e) {
    this.setState({
      showJoinGameForm: !this.state.showJoinGameForm,
      showCreateGameForm: this.state.showJoinGameForm && this.state.showCreateGameForm,
    });

    e.preventDefault();
  }

  login(username, password) {
    this.props.dispatch(Actions.loginRequest({ username, password }));
  }

  refresh() {
    if (this.isLoggedIn()) {
      const username = this.props.user.username;
      const password = this.props.user.password;
      this.props.dispatch(Actions.loginRequest({ username, password }));
    }
  }

  register(username, email, password) {
    this.props.dispatch(Actions.registerRequest({ username, email, password }));
  }

  logout() {
    this.setState({
      showCreateGameForm: false,
      showJoinGameForm: false,
    });
    this.props.dispatch(Actions.logoutRequest());
  }

  createGame(gamename, prompts) {
    const username = this.props.user.username;
    this.props.dispatch(Actions.createGameRequest(username, gamename, prompts));
  }

  endGame() {
    const username = this.props.user.username;
    this.props.dispatch(Actions.endGameRequest(username));
  }

  approveParticipant(participantName) {
    const username = this.props.user.username;
    this.props.dispatch(Actions.approveParticipantRequest(username, participantName));
  }

  rejectParticipant(participantName) {
    const username = this.props.user.username;
    this.props.dispatch(Actions.rejectParticipantRequest(username, participantName));
  }

  joinGame(hostname) {
    const username = this.props.user.username;
    this.props.dispatch(Actions.joinGameRequest(username, hostname));
  }

  leaveGame() {
    const username = this.props.user.username;
    const hostname = this.props.game.host;
    this.props.dispatch(Actions.leaveGameRequest(username, hostname));
  }

  // using as save game
  saveGame(gameState) {
    const username = this.props.user.username;
    this.props.dispatch(Actions.saveGameRequest(username, gameState));
  }

  // using as finish game
  finishGame(answers) {
    const username = this.props.user.username;
    const hostname = this.props.game.host;
    this.props.dispatch(Actions.finishGameRequest(username, hostname, answers));
  }

  // helpers

  isInGame() {
    return (Object.getOwnPropertyNames(this.props.game).length > 0);
  }

  isLoggedIn() {
    return (Object.getOwnPropertyNames(this.props.user).length > 0);
  }

  // componentDidMount() {
  //   if(this.props.posts.length === 0) {
  //     this.props.dispatch(Actions.fetchPosts());
  //   }
  // }

  render() {
    const logoutButton = `toggle ${(this.isLoggedIn() ? 'appear' : '')}`;
    return (
      <div>
        <Header onClick={this.handleClick} showButton={this.isLoggedIn()}/>
        <div className="container">
          <NoLoginView
            loginClick={this.loginClick} registerClick={this.registerClick} show={!this.isLoggedIn()}
          />
          <LoginForm
            loginUser={this.login} show={this.state.showLoginForm && !(this.isLoggedIn())}
          />
          <RegisterForm
            registerUser={this.register} show={this.state.showRegisterForm && !(this.isLoggedIn())}
          />
          <InactiveView
            createGameClick={this.createGameClick} joinGameClick={this.joinGameClick}
            show={(this.isLoggedIn()) && !(this.isInGame())}
          />
          <JoinGameForm
            joinGame={this.joinGame} show={(this.isLoggedIn()) && this.state.showJoinGameForm && !(this.isInGame())}
          />
          <CreateGameForm
            createGame={this.createGame} show={(this.isLoggedIn()) && this.state.showCreateGameForm && !(this.isInGame())}
          />
          <GameHostView
            game={this.props.game} approveUserClick={this.approveParticipant}
            rejectUserClick={this.rejectParticipant} endGameClick={this.endGame}
            refresh={this.refresh}
            show={this.isInGame() && (this.props.game.host === this.props.user.username)}
          />
          <GameParticipantView
            user={this.props.user} leaveGame={this.leaveGame}
            game={this.props.game} saveGame={this.saveGame}
            finishGame={this.finishGame}
            show={this.isInGame() && (this.props.game.host !== this.props.user.username)}
          />
          <hr/>
          <div className={logoutButton}>
            <b> Logged in as {this.props.user.username}. </b>
            <a className="btn btn-primary align-right" href="#" onClick={this.logout}>Log Out</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// HomeContainer.need = [() => { return Actions.fetchPosts(); }];
HomeContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    user: store.user,
    game: store.game,
  };
}

HomeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(HomeContainer);
