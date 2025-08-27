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
import getByKey from 'utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import withStyles from '@mui/material/styles/withStyles';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';

const Volumes = ({
  configMapsOptions,
  secretsOptions,
  containerIndex,
  fields,
  formValues,
  meta: { error, submitFailed },
  classes,
}) => (
  <List component="ul" className={classes.noPaddingList}>
    <ListItem>
      <ListItemText>
        <Button 
          className={classes.addNodeBtn} 
          variant="contained" color="primary" onClick={(evt) => fields.push(fromJS({}))}>
          <AddIcon className={classes.plusIcon} />
          <FormattedMessage {...messages.formVolumes} />
        </Button>
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
        default:
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
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.mountPath`}
              label={<FormattedMessage {...messages.formMountPath} />}
            />
          </ListItemText>
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            <MinusIcon />
          </IconButton>
        </ListItem>
      );
    })}
  </List>
);

export default Volumes;
