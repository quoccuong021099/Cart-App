import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Hidden } from '@material-ui/core';

export default function MakeGrid({ grids, allGridProps, containerProps }) {
  return (
    <Grid container spacing={2} {...containerProps}>
      {grids.map((grid, index) => {
        const key = index;

        return (
          <React.Fragment key={key}>
            <Grid item {...grid.props || allGridProps}>
              {grid.children}
            </Grid>
            {grid.divider && (
              <Hidden mdDown>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
              </Hidden>
            )}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
MakeGrid.propTypes = {
  grids: PropTypes.array, // các grid items
  allGridProps: PropTypes.object, // áp dụng cho toàn bộ grids
  containerProps: PropTypes.object, // grid container
};

MakeGrid.defaultProps = {
  grids: [
    {
      props: { xs: 12, sm: 6, md: 4, lg: 3, xl: true },
      children: 'Grid item',
      divider: true,
    },
  ],
};
