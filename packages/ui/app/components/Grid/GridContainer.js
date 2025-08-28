import React from 'react';
// nodejs library to set properties for components

// @mui/material components
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const style = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
};



export default withStyles(style)(GridContainer);
