/*
 *
 * Cart reducer
 *
 */
import produce from 'immer';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DELETE_ALL_PRODUCT,
  CHANGE_QUANTITY_PRODUCT,
} from './constants';
const listProductInCartLocal = JSON.parse(
  localStorage.getItem('listProductInCart'),
);
export const initialState = {
  listProductInCart: listProductInCartLocal || [],
};

/* eslint-disable default-case, no-param-reassign */
const cartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_PRODUCT: {
        const index = state.listProductInCart.findIndex(
          i => i.id === action.payload.id,
        );
        if (index < 0) {
          action.payload.quantity = 1;
          draft.listProductInCart = [
            ...state.listProductInCart,
            action.payload,
          ];
          localStorage.setItem(
            'listProductInCart',
            JSON.stringify(
              (draft.listProductInCart = [
                ...state.listProductInCart,
                action.payload,
              ]),
            ),
          );
        } else {
          draft.listProductInCart[index].quantity += 1;
          localStorage.setItem(
            'listProductInCart',
            JSON.stringify(draft.listProductInCart),
          );
        }

        break;
      }
      case DELETE_PRODUCT: {
        const index = state.listProductInCart.findIndex(
          i => i.id === action.payload,
        );
        if (index >= 0) {
          draft.listProductInCart.splice(index, 1);
        }
        localStorage.setItem(
          'listProductInCart',
          JSON.stringify(draft.listProductInCart),
        );
        break;
      }
      case DELETE_ALL_PRODUCT: {
        draft.listProductInCart = [];
        localStorage.removeItem('listProductInCart');
        break;
      }
      case CHANGE_QUANTITY_PRODUCT: {
        const index = state.listProductInCart.findIndex(
          i => i.id === action.data.id,
        );
        if (index >= 0) {
          if (action.data.change === 'up')
            draft.listProductInCart[index].quantity += 1;
          else draft.listProductInCart[index].quantity -= 1;
        }
        break;
      }
    }
  });

export default cartReducer;
