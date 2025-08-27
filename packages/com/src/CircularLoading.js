import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 100px)',
  },
}));

const Loading = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
});

export default Loading;
