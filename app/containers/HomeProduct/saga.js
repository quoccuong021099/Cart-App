// import { take, call, put, select } from 'redux-saga/effects';

import axios from 'axios';
import _get from 'lodash/get';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { getListProductFailured, getListProductSuccess } from './actions';
import { GET_LIST_PRODUCT } from './constants';

function fetchProducts() {
  return axios({
    method: 'GET',
    url: 'https://5ea004dc11b078001679d2cb.mockapi.io/api//products',
  });
}
function* getListProducSaga() {
  try {
    const response = yield call(fetchProducts);
    const productData = _get(response, 'data', []);
    yield delay(200);
    if (productData) {
      yield put(getListProductSuccess(productData));
    } else {
      yield put(getListProductFailured('Đã có lỗi xảy ra'));
    }
  } catch (error) {
    yield put(getListProductFailured(error));
  }
}

// Individual exports for testing
export default function* homeProductSaga() {
  yield takeLatest(GET_LIST_PRODUCT, getListProducSaga);
}
