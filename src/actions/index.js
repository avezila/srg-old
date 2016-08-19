import {createAction} from "redux-actions"

// export const offerRequest   = createAction('OFFERS_REQUEST')
// export const offerResponse  = createAction('OFFERS_RESPONSE')
// export const offerError     = createAction('OFFERS_ERROR')

export const filterChange         = createAction('FILTER_CHANGE')
export const filterOffersResponse = createAction('FILTER_OFFERS_RESPONSE')
export const getOffersResponse    = createAction('GET_OFFERS_RESPONSE')
export const getContextResponse   = createAction('GET_CONTEXT_RESPONSE')
export const addError             = createAction('ADD_ERROR')
export const removeError          = createAction('REMOVE_ERROR')
export const accessDenied         = createAction('ACCESS_DENIED')
export const requestComparableBounds  = createAction('REQUEST_COMPARABLE_BOUNDS')
export const responseComparableBounds = createAction('RESPONSE_COMPARABLE_BOUNDS')
export const changeContext            = createAction('CHANGE_CONTEXT')
export const changeFavorite        = createAction('CHANGE_FAVORITE')
export const addOfferToReport        = createAction('ADD_OFFER_TO_REPORT')