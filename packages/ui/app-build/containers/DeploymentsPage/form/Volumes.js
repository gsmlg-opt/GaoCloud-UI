/* eslint-disable default-case */
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
import getByKey from '../../../../src/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import withStyles from '@mui/styles.js';
import InputAdornment from '@mui/material/InputAdornment.js';
import Icon from '@mui/material/Icon.js';
import Checkbox from '@mui/material/Checkbox.js';
import FormControlLabel from '@mui/material/FormControlLabel.js';
import FormControl from '@mui/material/FormControl.js';
import InputLabel from '@mui/material/InputLabel.js';
import FormHelperText from '@mui/material/FormHelperText.js';
import FormGroup from '@mui/material/FormGroup.js';
import TextField from '@mui/material/TextField.js';
import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import ListItemText from '@mui/material/ListItemText.js';
import Button from '@mui/material/Button.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from '@mui/icons-material/Add.js';
import DeleteIcon from '@mui/icons-material/Delete.js';

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import SelectField from 'components/Field/SelectField.js';
import SwitchField from 'components/Field/SwitchField.js';
import RadioField from 'components/Field/RadioField.js';
import PlusIcon from 'components/Icons/Plus.js';
import MinusIcon from 'components/Icons/Minus.js';

import messages from '../messages';

const Volumes = ({
  configMapsOptions,
  secretsOptions,
  containerIndex,
  fields,
  formValues,
  meta: { error, submitFailed },
  role,
  classes,
}) => (
  <List component="ul" className={classes.noPaddingList}>
    <ListItem>
      <ListItemText>
        {role === 'update' ? (
          <FormattedMessage {...messages.formVolumes} />
        ) : (
          <Button
            className={classes.addNodeBtn}
            variant="contained" color="primary" onClick={(evt) => fields.push(fromJS({}))}>
            <AddIcon className={classes.plusIcon} />
            <FormattedMessage {...messages.formVolumes} />
          </Button>
        )}
      </ListItemText>
    </ListItem>
    {fields.map((f, i) => {
      let names = [];
      const type =
        formValues &&
        formValues.getIn(['containers', containerIndex, 'volumes', i, 'type']);
      const pvcts = formValues && formValues.get('persistentVolumes');
      switch (type) {
        case 'configmap':
          names = configMapsOptions;
          break;
        case 'secret':
          names = secretsOptions;
          break;
        case 'persistentVolume':
          if (pvcts && pvcts.size > 0) {
            names = pvcts.map((pvct) => ({
              label: pvct.get('name'),
              value: pvct.get('name'),
            }));
          }
          break;
      }
      return (
        <ListItem key={i}>
          <ListItemText>
            <SelectField
              name={`${f}.type`}
              label={<FormattedMessage {...messages.formVolumeType} />}
              options={[
                {
                  label: (
                    <FormattedMessage {...messages.formVolumeTypeConfigMap} />
                  ),
                  value: 'configmap',
                },
                {
                  label: (
                    <FormattedMessage {...messages.formVolumeTypeSecret} />
                  ),
                  value: 'secret',
                },
                {
                  label: (
                    <FormattedMessage
                      {...messages.formVolumeTypePersistentVolume}
                    />
                  ),
                  value: 'persistentVolume',
                },
              ]}
              formControlProps={{
                style: {
                  width: 146,
                },
              }}
              disabled={role === 'update'}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <SelectField
              name={`${f}.name`}
              label={<FormattedMessage {...messages.formVolumeName} />}
              options={names}
              formControlProps={{
                style: {
                  width: 146,
                },
              }}
              disabled={role === 'update'}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.mountPath`}
              label={<FormattedMessage {...messages.formMountPath} />}
            />
          </ListItemText>
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            {role === 'update' ? null : <MinusIcon />}
          </IconButton>
        </ListItem>
      );
    })}
  </List>
);

export default Volumes;
