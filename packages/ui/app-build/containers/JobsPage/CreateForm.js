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

import Containers from './form/Containers';
import useStyles from './styles';
import messages from './messages';

export const formName = 'createJobForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Form = ({ formValues, handleSubmit, error, configMaps, secrets }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer>
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.createJob} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ margin: 0 }}>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    inputProps={{ type: 'text', autoComplete: 'off' }}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <SelectField
                    label={<FormattedMessage {...messages.formRestartPolicy} />}
                    name="restartPolicy"
                    options={[
                      {
                        label: 'OnFailure',
                        value: 'OnFailure',
                      },
                      {
                        label: 'Never',
                        value: 'Never',
                      },
                    ]}
                    formControlProps={{
                      style: {
                        width: '100%',
                      },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FieldArray
            name="containers"
            classes={classes}
            component={Containers}
            configMaps={configMaps}
            secrets={secrets}
            formValues={formValues}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

const CreateJobForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateJobForm;
