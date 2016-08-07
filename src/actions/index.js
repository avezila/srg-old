import {createAction} from "redux-actions"

export const filterChange = createAction('FILTER_CHANGE')
export const offerRequest = createAction('OFFERS_REQUEST')
export const offerResponse = createAction('OFFERS_RESPONSE')
export const offerError = createAction('OFFERS_ERROR')