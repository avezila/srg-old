import { takeEvery,  takeLatest } from 'redux-saga'
import { call, put,take } from 'redux-saga/effects'
import * as actions from 'actions'

import api from "./Cian"


function * filterOffers(action){
  try {
    const request = {
      token  : "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkc2FkcyIsImV4cCI6OTAwMDAwMTQ3MDgzMjc5N30.nARQ90Cf0nJqZFFp3a-LN9HY9sqb6m2c6cA1KQarUXE",
      filter : action.payload,
    }
    const response = yield call(api.filterOffers, request)
    if(response.error.type){
      yield put(actions.addError({error:response.error}));
    }else {
      yield put(actions.filterOffersOK(response));
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

function * mySaga() {
  yield* takeLatest('FILTER_CHANGE', filterOffers);
}

export default mySaga;
