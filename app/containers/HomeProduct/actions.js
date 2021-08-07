import {
  GET_LIST_PRODUCT,
  GET_LIST_PRODUCT_FAILED,
  GET_LIST_PRODUCT_SUCCESS,
} from './constants';

export function getListProduct() {
  return {
    type: GET_LIST_PRODUCT,
  };
}
export function getListProductSuccess(payload) {
  return {
    type: GET_LIST_PRODUCT_SUCCESS,
    payload,
  };
}
export function getListProductFailured(message = '') {
  return {
    type: GET_LIST_PRODUCT_FAILED,
    message,
  };
}
