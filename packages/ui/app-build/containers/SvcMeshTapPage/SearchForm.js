import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable.js';
import getByKey from '../../../src/utils/getByKey';

import Button from '@mui/material/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import SelectField from 'components/Field/SelectField.js';

import messages from './messages';
import useStyles from './styles';

export const formName = 'TapSearchForm';

const validate = (values) => {
  const errors = {};
  if (!values.get('from')) {
    errors.from = 'Required';
  }
  return errors;
};

export const Form = ({
  clusterID,
  namespaceID,
  handleSubmit,
  error,
  formValues,
  workloads,
  stopAction,
  resetAction,
  isTapping,
  reset,
}) => {
  const classes = useStyles();
  const options = workloads
    .map((wl) => `${wl.get('type')}/${wl.get('name')}`)
    .toJS();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer className={classes.grid}>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}

        <GridItem xs={4} sm={4} md={4}>
          <SelectField
            label={<FormattedMessage {...messages.formFrom} />}
            name="from"
            options={options}
            fullWidth
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <SelectField
            label={<FormattedMessage {...messages.formTo} />}
            name="to"
            options={options}
            fullWidth
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}></GridItem>

        <GridItem xs={4} sm={4} md={4}>
          <SelectField
            label={<FormattedMessage {...messages.formMethod} />}
            fullWidth
            name="method"
            options={['GET', 'POST', 'PUT', 'DELETE']}
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          <InputField
            label={<FormattedMessage {...messages.formPath} />}
            name="path"
            fullWidth
          />
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          {isTapping ? (
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={(e) => {
                stopAction();
                e.preventDefault();
              }}
            >
              <FormattedMessage {...messages.tapStop} />
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              <FormattedMessage {...messages.tapStart} />
            </Button>
          )}
          <Button
            variant="contained"
            className={classes.cancleBtn}
            type="reset"
            onClick={(e) => {
              reset();
              stopAction();
              resetAction({}, { clusterID, namespaceID });
            }}
          >
            <FormattedMessage {...messages.tapReset} />
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const SearchForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default SearchForm;
