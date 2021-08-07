import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeProduct state domain
 */

const selectHomeProductDomain = state => state.homeProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeProduct
 */

const makeSelectListProduct = () =>
  createSelector(
    selectHomeProductDomain,
    substate => substate.listProduct,
  );
const makeSelectStatusFlags = () =>
  createSelector(
    selectHomeProductDomain,
    substate => substate.statusFlags,
  );

export { makeSelectListProduct, makeSelectStatusFlags };
