import { takeEvery, takeLatest } from 'lib/redux-saga'
import { call, put } from 'lib/redux-saga/effects'
import * as actions from 'actions'


async function Load(filter) {
  let q = encodeURIComponent(filter.input)
  if(q == "") return [];
  let data = await $.getJSON("https://geocode-maps.yandex.ru/1.x/?format=json&results=100&geocode="+q)
  return data.response.GeoObjectCollection.featureMember.map((m)=>{
    return m.GeoObject.metaDataProperty.GeocoderMetaData.text
  })
}

function * offerRequest(action){
   try {
      const offers = yield call(Load, action.payload.filter);
      yield put(actions.offerResponse({offers}));
   } catch (e) {
      yield put(actions.offerError(e.message));
   }
}

function * mySaga() {
  yield* takeLatest('FILTER_CHANGE', offerRequest);
}

export default mySaga;