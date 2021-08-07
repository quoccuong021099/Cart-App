/**
 *
 * Product
 *
 */

import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import TypographyLineClamp from '../AtomTypographyLineClamp';

function Product({ product, handleAdd }) {
  return (
    <Box
      width="100%"
      height="350px"
      display="flex"
      alignItems="flex-end"
      style={{
        backgroundImage: `url( ${(product && product.image) ||
          'http://product.hstatic.net/1000181810/product/ghe-nhua-chan-go-eames-trang-1_c39e0ca6959c41bcac18f8b5544a959a_grande.jpg'}
          )`,
        backgroundSize: 'cover',
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: '100%',
          backgroundColor: 'rgba(0,0,0,.5)',
          color: '#fff',
        }}
      >
        <CardContent
          style={{
            padding: '10px 20px 0',
          }}
        >
          <TypographyLineClamp line={2} varitant="subtitle2">
            <b>{product.name}</b>
          </TypographyLineClamp>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography
              variant="caption"
              component="p"
              style={{
                textDecoration: 'line-through',
                color: '#d4d0d0',
              }}
            >
              $
              {product.priceOld
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
            </Typography>
            <Typography variant="subtitle2" component="p">
              $
              {product.PriceNew.toString().replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                '$1.',
              )}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 20px 0 ',
          }}
        >
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            size="small"
            precision={0.5}
          />
          <IconButton
            aria-label="delete"
            variant="contained"
            color="secondary"
            onClick={() => handleAdd(product)}
          >
            <AddIcon variant="outlined" fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

Product.propTypes = {
  product: PropTypes.any,
  handleAdd: PropTypes.func,
};

export default Product;
