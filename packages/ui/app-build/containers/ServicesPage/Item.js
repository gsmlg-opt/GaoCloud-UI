/**
 *
 * Show Service
 *
 */
import React, { Fragment, useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';

import messages from './messages';
import useStyles from './styles';

export const Service = ({ service }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3}>
          <ReadOnlyInput
            label={<FormattedMessage {...messages.formName} />}
            value={service.get('name')}
            fullWidth
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3}>
          <ReadOnlyInput
            label={<FormattedMessage {...messages.formServiceType} />}
            value={service.get('serviceType')}
            fullWidth
          />
        </GridItem>
      </GridContainer>
      {service.get('serviceType') === 'loadbalancer' ? (
        <Fragment>
          <GridContainer>
            <GridItem xs={3} sm={3} md={3}>
              <ReadOnlyInput
                label={<FormattedMessage {...messages.formName} />}
                value={service.get('loadBalanceVip')}
                fullWidth
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <ReadOnlyInput
                label={<FormattedMessage {...messages.formServiceType} />}
                value={service.get('loadBalanceMethod')}
                fullWidth
              />
            </GridItem>
          </GridContainer>
        </Fragment>
      ) : null}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          <FormattedMessage {...messages.formExposedPorts} />
        </GridItem>
      </GridContainer>
      {service.get('exposedPorts').map((exposedPort, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formExposedPortName} />}
              fullWidth
              value={exposedPort.get('name')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={
                <FormattedMessage {...messages.formExposedPortTarget} />
              }
              fullWidth
              value={exposedPort.get('targetPort')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={
                <FormattedMessage {...messages.formExposedPortProtocol} />
              }
              fullWidth
              value={exposedPort.get('protocol')}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <ReadOnlyInput
              label={<FormattedMessage {...messages.formExposedPort} />}
              value={exposedPort.get('port')}
              fullWidth
            />
          </GridItem>
        </GridContainer>
      ))}
    </Fragment>
  );
};

export default Service;
