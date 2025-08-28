/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@mui/styles.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Helmet from 'components/Helmet/Helmet.js';

import img404 from '../../../app/images/404.png';

import NotFoundCard from './Card';
import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <NotFoundCard />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};
export default NotFound;
