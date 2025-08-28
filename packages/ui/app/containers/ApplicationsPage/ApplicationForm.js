import React, { PureComponent , useState,useEffect } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm, FieldArray } from 'redux-form/immutable';
import getByKey from '../../../src/utils/getByKey.js';

import { fromJS } from 'immutable';

import Danger from '../../components/Typography/Danger.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import InputField from '../../components/Field/InputField.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import SelectField from '../../components/Field/SelectField.js';
import ReadOnlyInput from '../../components/CustomInput/ReadOnlyInput.js';
import CheckboxField from '../../components/Field/CheckboxField.js';
import ConfirmDialog from '../../components/Confirm/ConfirmDialog.js';
import messages from './messages';
import DynamicForm from './form/dynamicForm';

const ApplicationForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  initialValues,
  clusterID,
  namespaceID,
  chart,
  storageClasses,
  formValues,
}) => {
  const versions = chart.get('versions') || fromJS([]);
  const versionsOptions = versions.map((sc) => ({
    label: sc.get('version'),
    value: sc.get('version'),
  }));
  const chartVersion = formValues && formValues.get('chartVersion');
  const currentVersion = versions.find(
    (v) => v.get('version') === chartVersion
  );
  const config = (currentVersion && currentVersion.get('config')) || fromJS([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
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
              <FormattedMessage {...messages.createApplicationDesc} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={1} sm={1} md={1}>
                <img
                  alt="application logo"
                  src={chart.get('icon')}
                  className={classes.appLogo}
                />
              </GridItem>
              <GridItem xs={11} sm={11} md={11}>
                <p className={classes.title}>{chart.get('id')}</p>
                <p className={classes.description}>
                  {chart.get('description')}
                </p>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.configurationOptions} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formClusterName} />}
                  value={clusterID}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formNamespaceName} />}
                  value={namespaceID}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <CheckboxField
                  name="injectServiceMesh"
                  label={
                    <FormattedMessage {...messages.formInjectServiceMesh} />
                  }
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <InputField
                  label={<FormattedMessage {...messages.formName} />}
                  name="name"
                  formControlProps={{
                    className: classes.nameControl,
                  }}
                  inputProps={{
                    type: 'text',
                    autoComplete: 'off',
                  }}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <SelectField
                  label={<FormattedMessage {...messages.formChartVersion} />}
                  name="chartVersion"
                  formControlProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  options={versionsOptions}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        {chartVersion ? (
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.dynamicOptions} />
              </h4>
            </CardHeader>
            <CardBody>
              <FieldArray
                name="config"
                classes={classes}
                component={DynamicForm}
                config={config}
                storageClasses={storageClasses}
                formValues={formValues}
              />
            </CardBody>
          </Card>
        ) : null}
      </GridContainer>
    </form>
  );
};

export default ApplicationForm;
