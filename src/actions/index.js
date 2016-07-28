import * as types from '../const/ActionTypes';


export function apiRequestContext(){
  return {
    type: types.API_REQUEST_CONTEXT,
  };
}


export function apiReceiveContext(context,error){
  return {
    type: types.API_RECEIVE_CONTEXT,
    context,
    error,
  }
}