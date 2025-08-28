import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  FormSection,
  reduxForm,
} from 'redux-form/immutable';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

import Danger from '../../../components/Typography/Danger.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import InputField from '../../../components/Field/InputField.js';
import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import MinusIcon from '../../../components/Icons/Minus.js';

import Envs from './Envs';
import Volumes from './Volumes';
import Ports from './Ports';
import useStyles from '../styles';
import messages from '../messages';

export const Containers = ({
  fields,
  formValues,
  configMaps,
  secrets,
  role,
  meta: { error, submitFailed },
}) => { 
  const classes = useStyles();
  const configMapsOptions = configMaps
    .toList()
    .map((m) => ({
      label: m.get('name'),
      value: m.get('id'),
    }))
    .unshift({
      label: <FormattedMessage {...messages.formNone} />,
      value: '',
    });
  const secretsOptions = secrets
    .toList()
    .map((s) => ({
      label: s.get('name'),
      value: s.get('id'),
    }))
    .unshift({
      label: <FormattedMessage {...messages.formNone} />,
      value: '',
    });
  return (
    <Fragment>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3}>
            <InputField
              label={<FormattedMessage {...messages.formContainerName} />}
              name={`${f}.name`}
              fullWidth
              disabled={role === 'update'}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <InputField
              label={<FormattedMessage {...messages.formContainerCommand} />}
              name={`${f}.command`}
              fullWidth
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <InputField
              label={<FormattedMessage {...messages.formContainerArgs} />}
              name={`${f}.args`}
              fullWidth
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray 
              name={`${f}.env`}
              component={Envs} 
              classes={classes} 
              formValues={formValues}
              role={role}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray 
              name={`${f}.volumes`}
              component={Volumes} 
              classes={classes} 
              formValues={formValues}
              containerIndex={i}
              configMapsOptions={configMapsOptions}
              secretsOptions={secretsOptions}
              role={role}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray 
              name={`${f}.exposedPorts`}
              component={Ports} 
              classes={classes} 
              formValues={formValues}
              role={role}
            />
          </GridItem>
        </GridContainer>
      ))}
    </Fragment>
  )
};

export default Containers;
