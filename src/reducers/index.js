import {handleActions} from "redux-actions"

import * as actions from 'actions'
import {Filter,Error} from 'const/Cian'

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
    errors : [action.payload.error,...state.errors],
  }),
  [actions.removeError] : (state,action) => ({
    ...state,
    errors : state.errors.filter((el,i)=> action.payload.id != i),
  })
}, {
  filter : Filter(),
  offers : [],
  errors : [],
});
