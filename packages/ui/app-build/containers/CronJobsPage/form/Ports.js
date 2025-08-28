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

const Ports = ({ fields, classes, meta: { error, submitFailed } }) => {
  const options = [
    { label: 'TCP', value: 'tcp' },
    { label: 'UDP', value: 'udp' },
  ];

  return (
    <List component="ul" className={classes.noPaddingList}>
      <ListItem>
        <ListItemText>
          <Button
            className={classes.addNodeBtn}
            variant="contained" color="primary"
            onClick={(evt) => fields.push(fromJS({ protocol: 'tcp' }))}
          >
            <AddIcon className={classes.plusIcon} />
            <FormattedMessage {...messages.formExposedPorts} />
          </Button>
        </ListItemText>
      </ListItem>
      {fields.map((f, i) => (
        <ListItem key={i}>
          <ListItemText>
            <InputField
              label={<FormattedMessage {...messages.formPortName} />}
              name={`${f}.name`}
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
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.port`}
              label={<FormattedMessage {...messages.formPort} />}
              normalize={(val) => (val ? Number(val) : val)}
              inputProps={{
                type: 'number',
              }}
            />
          </ListItemText>
          <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
            <MinusIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Ports;
