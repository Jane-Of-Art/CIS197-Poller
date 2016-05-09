import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

// ********* //
// * Users * //
// ********* //

export function loginStatus(user, game) {
  return {
    type: ActionTypes.LOGIN_STATUS,
    user,
    game,
  };
}

export function loginStatusRequest() {
  return (dispatch) => {
    return fetch(`${baseURL}/u/loginStatus`).
      then((response) => response.json()).
      then((response) => dispatch(loginStatus(response.user, response.game)));
  };
}

export function login(user, game) {
  return {
    type: ActionTypes.LOGIN_USER,
    user,
    game,
  };
}

export function loginRequest(user) {
  return (dispatch) => {
    fetch(`${baseURL}/u/loginUser`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(login(res.user, res.game)));
  };
}

export function register(user, game) {
  return {
    type: ActionTypes.REGISTER_USER,
    user,
    game,
  };
}

export function registerRequest(user) {
  return (dispatch) => {
    fetch(`${baseURL}/u/registerUser`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(register(res.user, res.game)));
  };
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function logoutRequest() {
  return (dispatch) => {
    return fetch(`${baseURL}/u/logoutUser`).
      then((res) => res.json()).then(() => dispatch(logout()));
  };
}

// ********* //
// * Hosts * //
// ********* //

export function createGame(game) {
  return {
    type: ActionTypes.CREATE_GAME,
    game,
  };
}

export function createGameRequest(username, gamename, prompts) {
  return (dispatch) => {
    fetch(`${baseURL}/g/create`, {
      method: 'post',
      body: JSON.stringify({
        game: {
          username: username,
          gamename: gamename,
          prompts: prompts,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(createGame(res.game)));
  };
}

export function endGame() {
  return {
    type: ActionTypes.END_GAME,
  };
}

export function endGameRequest(username) {
  return (dispatch) => {
    fetch(`${baseURL}/g/end`, {
      method: 'post',
      body: JSON.stringify({
        game: {
          username: username,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(() => dispatch(endGame()));
  };
}

export function joinGame(game, user) {
  return {
    type: ActionTypes.JOIN_GAME,
    game,
    user,
  };
}

export function joinGameRequest(username, hostname) {
  return (dispatch) => {
    fetch(`${baseURL}/g/join`, {
      method: 'post',
      body: JSON.stringify({
        request: {
          username: username,
          hostname: hostname,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(joinGame(res.game, res.user)));
  };
}

export function leaveGame() {
  return {
    type: ActionTypes.LEAVE_GAME,
  };
}

export function leaveGameRequest(username, hostname) {
  return (dispatch) => {
    fetch(`${baseURL}/g/leave`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: username,
          hostname: hostname,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(() => dispatch(endGame()));
  };
}

export function saveGame() {
  return {
    type: ActionTypes.SAVE_GAME,
  };
}

export function saveGameRequest(username, gameState) {
  return (dispatch) => {
    fetch(`${baseURL}/g/save`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: username,
          gameState: gameState,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(() => dispatch(saveGame()));
  };
}

export function finishGame() {
  return {
    type: ActionTypes.FINISH_GAME,
  };
}

export function finishGameRequest(username, hostname, answers) {
  return (dispatch) => {
    fetch(`${baseURL}/g/finish`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: username,
          hostname: hostname,
          answers: answers,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(() => dispatch(finishGame()));
  };
}
