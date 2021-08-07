/**
 *
 * ProductItem
 *
 */

import { IconButton, TableCell, TableRow } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveIcon from '@material-ui/icons/Remove';
import { PropTypes } from 'prop-types';
import React from 'react';

function ProductItem({ product, handleDelete, handleChangeQuantity }) {
  return (
    <>
      <TableRow style={{ height: '80px', maxHeight: '200px' }}>
        <TableCell
          component="th"
          scope="row"
          style={{ overflow: 'hidden', maxWidth: '600px' }}
        >
          {product && product.name}
        </TableCell>
        <TableCell align="left">
          <img
            src={product && product.image}
            // "http://product.hstatic.net/1000181810/product/ghe-nhua-chan-go-eames-trang-1_c39e0ca6959c41bcac18f8b5544a959a_grande.jpg"
            alt=""
            width="100px"
          />
        </TableCell>
        <TableCell align="center">
          <IconButton
            disabled={product.quantity === 1 && true}
            aria-label="delete"
            onClick={() =>
              handleChangeQuantity({ change: 'down', id: product.id })
            }
          >
            <RemoveIcon />
          </IconButton>
          {product &&
            product.quantity
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          <IconButton
            onClick={() =>
              handleChangeQuantity({ change: 'up', id: product.id })
            }
          >
            <AddIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {product &&
            product.PriceNew.toString().replace(
              /(\d)(?=(\d{3})+(?!\d))/g,
              '$1.',
            )}
        </TableCell>
        <TableCell align="center">
          {product &&
            (product.quantity * product.PriceNew)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </TableCell>
        <TableCell align="center">
          <DeleteForeverIcon
            style={{ cursor: 'pointer' }}
            color="secondary"
            onClick={() => handleDelete(product.id)}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.any,
  handleDelete: PropTypes.func,
  handleChangeQuantity: PropTypes.func,
};

export default ProductItem;
