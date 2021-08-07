import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import ProductItem from '../../components/ProductItem';
import {
  changeQuantityProduct,
  deleteAllProduct,
  deleteProduct,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectListProductInCart } from './selectors';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    color: '#fff',
  },
});

export function Cart({
  listProduct,
  triggerDeleteProduct,
  triggerDeleteAllProduct,
  triggerChangeQuantity,
}) {
  useInjectReducer({ key: 'cart', reducer });
  useInjectSaga({ key: 'cart', saga });
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    listProduct.map(i => {
      total += i.quantity * i.PriceNew;
      return i.quantity;
    });
    setTotalPrice(total);
  }, [listProduct]);
  const handleDelete = id => {
    triggerDeleteProduct(id);
  };
  const handleDeleteAll = () => {
    triggerDeleteAllProduct();
  };

  const handleChangeQuantity = info => {
    triggerChangeQuantity(info);
  };

  return (
    <Box display="flex" justifyContent="center" py={5} minHeight="100vh">
      {listProduct && listProduct.length !== 0 ? (
        <Box style={{ maxWidth: '85vw', minWidth: '80vw' }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#f50057', color: '#fff' }}>
                  <TableCell>
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Product name</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Product image</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Quantity</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Product price</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Into money</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="button"
                      className={classes.tableHeader}
                    >
                      <b> Action</b>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct.map(item => (
                  <ProductItem
                    product={item}
                    key={`abvc${item.id}`}
                    handleDelete={handleDelete}
                    handleChangeQuantity={handleChangeQuantity}
                  />
                ))}
                <TableRow>
                  <TableCell align="left">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleDeleteAll}
                    >
                      Delete all products
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button color="primary" variant="contained" fullWidth>
                        Continue shopping
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="center" />
                  <TableCell align="center" />
                  <TableCell align="center">
                    <Typography variant="button">
                      <b>
                        {' '}
                        Total price: $
                        {totalPrice
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                      </b>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleDeleteAll}
                      >
                        Payment
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png"
            alt="Not product"
            width="600"
            height="400"
          />
          <Typography variant="h5" color="secondary">
            There are no products in the cart!!!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Cart.propTypes = {
  // dispatch: PropTypes.func,
  listProduct: PropTypes.any,
  triggerDeleteProduct: PropTypes.func,
  triggerDeleteAllProduct: PropTypes.func,
  triggerChangeQuantity: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listProduct: makeSelectListProductInCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerDeleteProduct: id => dispatch(deleteProduct(id)),
    triggerDeleteAllProduct: () => dispatch(deleteAllProduct()),
    triggerChangeQuantity: data => dispatch(changeQuantityProduct(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Cart);
