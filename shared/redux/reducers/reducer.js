import * as ActionTypes from '../constants/constants';

const initialState = { user: {}, game: {} };

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.LOGIN_STATUS :
      return {
        user: action.user,
        game: action.game,
      };

    case ActionTypes.LOGIN_USER :
      return {
        user: action.user,
        game: action.game,
      };

    case ActionTypes.REGISTER_USER :
      return {
        user: action.user,
        game: action.game,
      };

    case ActionTypes.LOGOUT_USER :
      return {
        user: {},
        game: {},
      };

    case ActionTypes.CREATE_GAME :
      return {
        user: state.user,
        game: action.game,
      };

    case ActionTypes.END_GAME :
      return {
        user: state.user,
        game: {},
      };

    case ActionTypes.APPROVE_PARTICIPANT :
      return {
        user: state.user,
        game: action.game,
      };

    case ActionTypes.REJECT_PARTICIPANT :
      return {
        user: state.user,
        game: action.game,
      };

    case ActionTypes.JOIN_GAME :
      return {
        user: action.user,
        game: action.game,
      };

    case ActionTypes.LEAVE_GAME :
      return {
        user: state.user,
        game: {},
      };

    case ActionTypes.FINISH_GAME :
      return {
        user: state.user,
        game: {},
      };

    case ActionTypes.SAVE_GAME :
      return {
        user: state.user,
        game: state.game,
      };

    default:
      return state;
  }
};

export default postReducer;
