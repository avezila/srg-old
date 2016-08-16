import {handleActions} from "redux-actions"

import * as actions from 'actions'
import {Filter,Error,ParseOffer} from 'const/Cian'

let errorID = 0;

export const cian = handleActions({
  [actions.filterChange]: (state, action) =>({
    ...state,
    filter : Filter(action.payload.filter),
  }),
  [actions.filterOffersResponse]: (state, action) => ({
    ...state,
    offerIDs : action.payload.offerIDs || [],
  }),
  [actions.addError] : (state,action) => ({
    ...state,
    errors : [{
      ...action.payload.error,
      id    : errorID++,
      time  : 10*1000+new Date().getTime(),
    },...state.errors],
  }),
  [actions.removeError] : (state,action) => ({
    ...state,
    errors : state.errors.filter(el=> action.payload.id != el.id),
  }),
  [actions.getOffersResponse]: (state, action) => {
    let newState = {...state, offers : {...state.offers}}
    action.payload.offers.map(offer=>{
      offer = ParseOffer(offer)
      if(offer.id)
        newState.offers[offer.id] = offer;
    })
    return newState;
  },
}, {
  filter    : Filter(),
  context   : {
    token :  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkc2FkcyIsImV4cCI6OTAwMDAwMTQ3MDgzMjc5N30.nARQ90Cf0nJqZFFp3a-LN9HY9sqb6m2c6cA1KQarUXE",
  },
  offers    : {},
  offerIDs  : [],
  errors    : [],
});
