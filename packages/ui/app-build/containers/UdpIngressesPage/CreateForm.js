import React, { PureComponent, Fragment, useState,useEffect } from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  FormSection,
  reduxForm,
} from 'redux-form/immutable.js';
import getByKey from '../../../src/utils/getByKey';

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import SelectField from 'components/Field/SelectField.js';
import SwitchField from 'components/Field/SwitchField.js';
import RadioField from 'components/Field/RadioField.js';
import ConfirmDialog from 'components/Confirm/ConfirmDialog.js';

import RuleTemplate from './form/RuleTemplate';
import useStyles from './styles';
import messages from './messages';

export const formName = 'createUdpIngressForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['serviceName'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Form = ({ formValues, handleSubmit, error, services }) => {
  const classes = useStyles();
  const servicesOptions = services.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer className={classes.contentGrid}>
        {error ? <ConfirmDialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          content={<p className={classes.saveFaildText}>{getByKey(error, ['response', 'message'])}</p>}
          hideActions
          type="save"
          showCloseIcon
        />: null}
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.createUdpIngress} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <SelectField
                  label={<FormattedMessage {...messages.formServiceName} />}
                  name="serviceName"
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  options={servicesOptions}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FieldArray
                  name="rules"
                  component={RuleTemplate}
                  formValues={formValues}
                  services={services}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </form>
  );
};

const CreateUdpIngressForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateUdpIngressForm;
