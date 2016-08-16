import { takeEvery,  takeLatest } from 'redux-saga'
import { call, put, take, select, fork } from 'redux-saga/effects'
import * as actions from 'actions'

import CianApi from "./CianApi"
import {TestCianApi} from "./TestCianApi"

function * filterOffers(action){
  let token = (yield select()).cian.context.token;
  if(!token)
    return yield put(actions.accessDenied());
  try {
    const request = {
      token,
      filter : action.payload.filter,
    }
    const response = yield call(CianApi.filterOffers, request);
    if(response.error.type){
      yield put(actions.addError({error:response.error}));
    }else {
      yield put(actions.filterOffersResponse(response));
    }
  } catch (e) {
    yield put(actions.addError({
      error : {
        type : "FETCH",
        e,
      }
    }));
  }
}

function * getOffers(action){
  let state = (yield select()).cian
  let needRequest = [];
  for (let id of action.payload.offerIDs)
    if(!state.offers[id])
      needRequest.push(id)
  if(!needRequest.length)
    return;
  let token = state.context.token;
  if(!token)
    return yield put(actions.accessDenied());
  try {
    const request = {
      token,
      offerIDs : needRequest,
    }
    const response = yield call(CianApi.getOffers,request);
    if(response.error.type){
      yield put(actions.addError({error:response.error}));
    }else {
      yield put(actions.getOffersResponse(response));
    }
  } catch (e) {
    yield put(actions.addError({
      error : {
        type : "FETCH",
        e,
      }
    }));
  }
}

function * onFilterChange (){
  yield* takeLatest('FILTER_CHANGE', filterOffers);
}

function * onFilterOffersResponse (){
  yield* takeLatest('FILTER_OFFERS_RESPONSE', getOffers);
}

function * onAddError(){
  while (true){
    let {e} = (yield take("ADD_ERROR")).payload.error
    if (e)
      console.error(e.stack || e.message)
  }
}

function * mySaga() {
  yield fork(onFilterChange)
  yield fork(onFilterOffersResponse)
  yield fork(TestCianApi)
  yield fork(onAddError)
}

export default mySaga;