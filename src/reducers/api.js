import * as types from '../const/ActionTypes';


const initialState = {
  context : {

  }
};

export default function api(state = initialState, action) {
  switch (action.type) {
    case types.API_REQUEST_CONTEXT:
      return state;
    case types.API_RECEIVE_CONTEXT:
      return {
        ...state,
        context : action.context,
      }
    default:
      return state;
  }
}