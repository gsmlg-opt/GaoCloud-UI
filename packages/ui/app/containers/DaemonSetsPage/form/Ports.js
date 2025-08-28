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
import getByKey from '../../../../src/utils/getByKey.js';
import AceEditor from 'react-ace';
import classNames from 'classnames';

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

import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardFooter from '../../../components/Card/CardFooter.js';
import CustomInput from '../../../components/CustomInput/CustomInput.js';
import ReadOnlyInput from '../../../components/CustomInput/ReadOnlyInput.js';
import Danger from '../../../components/Typography/Danger.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import InputField from '../../../components/Field/InputField.js';
import SelectField from '../../../components/Field/SelectField.js';
import SwitchField from '../../../components/Field/SwitchField.js';
import RadioField from '../../../components/Field/RadioField.js';
import PlusIcon from '../../../components/Icons/Plus.js';
import MinusIcon from '../../../components/Icons/Minus.js';

import messages from '../messages';

const Ports = ({ fields, meta: { error, submitFailed }, role, classes }) => {
  const options = [
    { label: 'TCP', value: 'tcp' },
    { label: 'UDP', value: 'udp' },
  ];

  return (
    <List component="ul" className={classes.noPaddingList}>
      <ListItem>
        <ListItemText>
          {role === 'update' ? (
            <FormattedMessage {...messages.formExposedPorts} />
          ) : (
            <Button
              className={classes.addNodeBtn}
              variant="contained" color="primary"
              onClick={(evt) => fields.push(fromJS({ protocol: 'tcp' }))}
            >
              <AddIcon className={classes.plusIcon} />
              <FormattedMessage {...messages.formExposedPorts} />
            </Button>
          )}
        </ListItemText>
      </ListItem>
      {fields.map((f, i) => (
        <ListItem key={i}>
          <ListItemText>
            <InputField
              label={<FormattedMessage {...messages.formPortName} />}
              name={`${f}.name`}
              disabled={role === 'update'}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <SelectField
              name={`${f}.protocol`}
              label={<FormattedMessage {...messages.formPortProtocol} />}
              options={options}
              formControlProps={{
                style: {
                  width: '146px',
                },
              }}
              disabled={role === 'update'}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.port`}
              label={<FormattedMessage {...messages.formPort} />}
              normalize={(val) => (val ? Number(val) : val)}
              inputProps={{
                type: 'number',
              }}
              disabled={role === 'update'}
            />
          </ListItemText>
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            {role === 'update' ? null : <MinusIcon />}
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Ports;
