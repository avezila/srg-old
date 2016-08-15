import {handleActions} from "redux-actions"

import * as actions from 'actions'
import {Filter,Error} from 'const/Cian'

let errorID = 0;

export const cian = handleActions({
  [actions.filterChange]: (state, action) =>({
    ...state,
    filter : Filter(action.payload),
  }),
  [actions.offerRequest]: (state, action) =>({
    ...state,
  }),
  [actions.offerResponse]: (state, action) => ({
    ...state,
    offers : action.payload.offers,
  }),
  [actions.offerError]: (state, action) => ({
    ...state,
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
  })
}, {
  filter : Filter(),
  offers : [],
  errors : [],
});
