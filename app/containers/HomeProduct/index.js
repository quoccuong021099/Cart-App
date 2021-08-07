/* eslint-disable array-callback-return */
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Alert, Autocomplete, Skeleton } from '@material-ui/lab';
import _debounce from 'lodash/debounce';
import _trim from 'lodash/trim';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Product from '../../components/Product';
import { addProduct } from '../Cart/actions';
import cartReducer from '../Cart/reducer';
import { getListProduct } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectListProduct, makeSelectStatusFlags } from './selectors';
const top100Films = [
  { type: 'upTodown', title: 'From high to low' },
  { type: 'downToUp', title: 'From low to high' },
  { type: 'rating', title: 'Rating' },
];
export function HomeProduct({
  triggerListProduct,
  listProduct,
  triggerAddProduct,
  statusFlags,
}) {
  useInjectReducer({ key: 'homeProduct', reducer });
  useInjectReducer({ key: 'cart', reducer: cartReducer });
  useInjectSaga({ key: 'homeProduct', saga });

  const [searchValue, setSearchValue] = React.useState('');
  const [valueSort, setValueSort] = React.useState('');
  const [list, setList] = React.useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    triggerListProduct();
  }, []);

  const handleAdd = product => {
    triggerAddProduct(product);
    setOpen(true);
  };

  const delayedQuery = useCallback(
    _debounce(query => {
      // trigger call API
      setList(
        listProduct.filter(i =>
          i.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, 500),
    [],
  );
  const getValueInput = e => {
    setSearchValue(e.target.value);
    delayedQuery(_trim(e.target.value));
  };

  const getOption = (event, newValue) => {
    if (event.target.value !== undefined) {
      setValueSort(newValue.type);
    }
  };

  const sortBy =
    listProduct &&
    // eslint-disable-next-line consistent-return
    listProduct.sort((a, b) => {
      if (valueSort === 'rating') return b.rating - a.rating;
      if (valueSort === 'upTodown') return b.PriceNew - a.PriceNew;
      if (valueSort === 'downToUp') return a.PriceNew - b.PriceNew;
    });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container
      style={{ maxWidth: '1920px', height: 'auto', minHeight: '100vh' }}
    >
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success">
          Add product success!
        </Alert>
      </Snackbar>
      <Grid container spacing={2} style={{ padding: '50px 20px' }}>
        <Grid item xs={12} lg={6}>
          <img
            src="https://bplusfurniture.com.vn/static/logo-full.png"
            alt="logo"
            width="160px"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Autocomplete
            // style={{ marginRight: '10px', width: 180 }}
            id="combo-box-demo"
            size="small"
            value={valueSort.type && valueSort.type}
            getOptionLabel={option => option.title}
            onChange={getOption}
            options={top100Films}
            renderInput={params => (
              <TextField
                {...params}
                color="secondary"
                label="Sorted by"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="Enter the product you are looking for"
            color="secondary"
            // style={{ width: '500px' }}
            fullWidth
            value={searchValue}
            onChange={getValueInput}
            label="Search product"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" fontSize="medium" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      {/* <Box
        py={5}
        px={2}
        display="flex"
        justifyContent="space-between"
        maxWidth="100%"
      >
        <img
          src="https://bplusfurniture.com.vn/static/logo-full.png"
          alt="logo"
          width="160px"
        />
        <Box
          with="80%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Autocomplete
            style={{ marginRight: '10px', width: 180 }}
            id="combo-box-demo"
            size="small"
            value={valueSort.type && valueSort.type}
            getOptionLabel={option => option.title}
            onChange={getOption}
            options={top100Films}
            renderInput={params => (
              <TextField
                {...params}
                color="secondary"
                label="Sorted by"
                variant="standard"
              />
            )}
          />

          <TextField
            id="input-with-icon-textfield"
            placeholder="Enter the product you are looking for"
            color="secondary"
            style={{ width: '500px' }}
            value={searchValue}
            onChange={getValueInput}
            label="Search product"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" fontSize="medium" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box> */}
      <Box p={2}>
        <Grid container spacing={2}>
          {statusFlags.isLoading ? (
            Array.from(new Array(12)).map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                key={(() => `${index}`)()}
              >
                <Skeleton variant="rect" width="100%" height="350px" />
              </Grid>
            ))
          ) : (
            <>
              {searchValue.length > 0 ? (
                <>
                  {list.length > 0 ? (
                    list.map(i => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={`id${i.id}`}>
                        <Product product={i} handleAdd={handleAdd} />
                      </Grid>
                    ))
                  ) : (
                    <Box
                      width="100%"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
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
                </>
              ) : (
                <>
                  {listProduct &&
                    sortBy.map(i => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={`id${i.id}`}>
                        <Product product={i} handleAdd={handleAdd} />
                      </Grid>
                    ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

HomeProduct.propTypes = {
  triggerListProduct: PropTypes.func,
  triggerAddProduct: PropTypes.func,
  listProduct: PropTypes.any,
  statusFlags: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  listProduct: makeSelectListProduct(),
  statusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerListProduct: () => dispatch(getListProduct()),
    triggerAddProduct: product => dispatch(addProduct(product)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeProduct);
