/**
 *
 * HeaderPage
 *
 */

import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectListProductInCart } from '../../containers/Cart/selectors';
import MakeGrid from '../MakeGrid';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textDecoration: 'none',
      flexGrow: 1,
      fontWeight: 'bold',
      color: '#f50057',
      '&:hover': {
        color: '#3f51b5',
        cursor: 'pointer',
      },
    },
  }),
);
function HeaderPage({ numberCart }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: '1920px' }}>
        <Box p={2}>
          <MakeGrid
            grids={[
              {
                children: (
                  <Box display="flex" justifyContent="center">
                    <Typography
                      color="secondary"
                      variant="button"
                      className={classes.title}
                    >
                      <Link to="/" className={classes.title}>
                        <HomeIcon />
                      </Link>
                    </Typography>
                  </Box>
                ),
                props: { xs: 2 },
              },
              {
                children: <Typography color="secondary" />,
                props: { xs: 8 },
              },
              {
                children: (
                  <Box display="flex" justifyContent="center">
                    <Typography
                      color="secondary"
                      variant="button"
                      className={classes.title}
                    />
                    <Link to="/details" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ShoppingCartIcon />}
                        style={{
                          position: 'fixed',
                          top: '8px',
                          right: '40px',
                          backgroundColor: '#303f9f',
                        }}
                      >
                        {numberCart && `[${numberCart.length}]`}
                      </Button>
                    </Link>
                  </Box>
                ),
                props: { xs: 2 },
              },
            ]}
          />
        </Box>
      </Container>
      <Divider />
    </div>
  );
}

HeaderPage.propTypes = {
  numberCart: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  numberCart: makeSelectListProductInCart(),
});
// export default
// connect(
// mapStateToProps,
// null,
// )
// HeaderPage;
const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(HeaderPage);
