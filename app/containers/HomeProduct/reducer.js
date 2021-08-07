/*
 *
 * HomeProduct reducer
 *
 */
import produce from 'immer';
import {
  GET_LIST_PRODUCT,
  GET_LIST_PRODUCT_FAILED,
  GET_LIST_PRODUCT_SUCCESS,
} from './constants';
export const initialState = {
  listProduct: [],
  statusFlags: {
    isLoading: false,
    isSuccess: false,
  },
  logs: {
    error: '',
  },
};
/* eslint-disable default-case, no-param-reassign */
const homeProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PRODUCT:
        draft.statusFlags.isLoading = true;
        break;
      case GET_LIST_PRODUCT_SUCCESS:
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isSuccess = true;
        draft.listProduct = action.payload;
        break;
      case GET_LIST_PRODUCT_FAILED:
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isSuccess = false;
        draft.logs.error = action.message;
        break;
    }
  });

export default homeProductReducer;
