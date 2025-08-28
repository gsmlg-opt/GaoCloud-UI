import React from 'react';
import withStyles from '@mui/styles.js';
import Breadcrumbs from '@mui/material/Breadcrumbs.js';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext.js';
import Button from '@mui/material/Button.js';
import Typography from '@mui/material/Typography.js';
import homeIcon from '../../../app/images/clusters/home.png';

const style = {
  breadcrumbs: {
    padding: 6,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    verticalAlign: 'text-bottom',
    color: '#404040',
  },
  inherit: {
    color: '#8C8C8C',
    textDecoration: 'none',
  },
  textPrimary: {
    color: '#404040',
    textDecoration: 'none',
  },
};

function BreadcrumbsContainer({ ...props }) {
  const { classes, children, className, data, ...rest } = props;
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      className={classes.breadcrumbs}
    >
      <Link color="inherit" to="/">
        <img src={homeIcon} className={classes.icon} alt="home" />
      </Link>
      {data.map((prop, key) =>
        key === data.length - 1 ? (
          <Typography className={classes.textPrimary} key={key}>
            {prop.name}
          </Typography>
        ) : (
          <Link className={classes.inherit} to={prop.path} key={key}>
            {prop.name}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
}


export default withStyles(style)(BreadcrumbsContainer);
