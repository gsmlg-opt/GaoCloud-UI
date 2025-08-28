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
} from 'redux-form/immutable';
import getByKey from '../../../src/utils/getByKey.js';

import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import Danger from '../../components/Typography/Danger.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import InputField from '../../components/Field/InputField.js';
import ReadOnlyInput from '../../components/CustomInput/ReadOnlyInput.js';
import SelectField from '../../components/Field/SelectField.js';

import messages from './messages';
import useStyles from './styles';

export const RollbackForm = ({
  handleSubmit,
  error,
  configMaps,
  formValues,
  history,
}) => {
  const classes = useStyles();
  const historyOptions = history.map((h) => ({
    label: h.version,
    value: h.version,
  }));
  const current = history.find((h) => h.version === formValues.get('version'));

  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={5} sm={5} md={5}>
              <SelectField
                label={<FormattedMessage {...messages.formVersionInfo} />}
                name="version"
                fullWidth
                options={historyOptions}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={10} sm={10} md={10}>
              <ReadOnlyInput
                label={<FormattedMessage {...messages.formReason} />}
                value={current && current.changeReason}
                fullWidth
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default RollbackForm;
