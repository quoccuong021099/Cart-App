/**
 *
 * Footer
 *
 */

import { Box, Typography } from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Footer() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={5}
      style={{ backgroundColor: '#999', color: '#fff' }}
    >
      <Typography variant="button">
        <b>Free shipping & returns</b>
      </Typography>
      <Typography variant="button">
        <b>24/7 Support</b>
      </Typography>
      <Typography variant="button">
        <b>100% Cenuine products</b>
      </Typography>
    </Box>
  );
}

Footer.propTypes = {};

export default Footer;
