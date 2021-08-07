/*
 *
 * Cart actions
 *
 */

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DELETE_ALL_PRODUCT,
  CHANGE_QUANTITY_PRODUCT,
} from './constants';

export function addProduct(payload) {
  return {
    type: ADD_PRODUCT,
    payload,
  };
}
export function deleteProduct(payload) {
  return {
    type: DELETE_PRODUCT,
    payload,
  };
}
export function deleteAllProduct() {
  return {
    type: DELETE_ALL_PRODUCT,
  };
}
export function changeQuantityProduct(data) {
  return {
    type: CHANGE_QUANTITY_PRODUCT,
    data,
  };
}
