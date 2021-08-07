import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cart state domain
 */

const selectCartDomain = state => state.cart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cart
 */

const makeSelectListProductInCart = () =>
  createSelector(
    selectCartDomain,
    substate => substate.listProductInCart,
  );

export { makeSelectListProductInCart };
