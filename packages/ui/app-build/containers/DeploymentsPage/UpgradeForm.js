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

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import RadioField from 'components/Field/RadioField.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';

import messages from './messages';
import useStyles from './styles';

export const UpgradeForm = ({
  handleSubmit,
  error,
  configMaps,
  formValues,
}) => {
  const classes = useStyles();

  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          {formValues.get('images').map((img, i) => (
            <GridContainer key={img.get('name')}>
              <GridItem xs={5} sm={5} md={5}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formContainerName} />}
                  value={img.get('name')}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={5} sm={5} md={5}>
                <InputField
                  label={<FormattedMessage {...messages.formImage} />}
                  name={`images[${i}].image`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                />
              </GridItem>
            </GridContainer>
          ))}
        </GridItem>
        <GridItem xs={10} sm={10} md={10}>
          <InputField
            label={<FormattedMessage {...messages.formReason} />}
            name="reason"
            fullWidth
            inputProps={{ type: 'text', autoComplete: 'off' }}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default UpgradeForm;
