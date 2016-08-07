import {handleActions} from "redux-actions"

import * as actions from 'actions'


export const app = handleActions({
  [actions.filterChange]: (state, action) =>({
    ...state,
    filter : action.payload.filter,
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
}, {
  filter : {
    input : "",
  },
  offers : [],
});
