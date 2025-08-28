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

import messages from './messages';

const EventsFilterForm = ({
  types,
  namespaces,
  kinds,
  names,
  handleSubmit,
  classes,
}) => (
  <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
    <GridContainer style={{ marginBottom: 15 }}>
      <GridItem xs={2} sm={2} md={2}>
        <SelectField
          label={<FormattedMessage {...messages.tableTitleType} />}
          name="type"
          options={[{ label: 'ALL', value: '__all__' }].concat(types)}
          inputProps={{ displayEmpty: true }}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
        />
      </GridItem>
      <GridItem xs={2} sm={2} md={2}>
        <SelectField
          label={<FormattedMessage {...messages.tableTitleNamespace} />}
          name="namespace"
          options={[{ label: 'ALL', value: '__all__' }].concat(namespaces)}
          inputProps={{ displayEmpty: true }}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
        />
      </GridItem>
      <GridItem xs={2} sm={2} md={2}>
        <SelectField
          label={<FormattedMessage {...messages.tableTitleKind} />}
          name="kind"
          options={[{ label: 'ALL', value: '__all__' }].concat(kinds)}
          inputProps={{ displayEmpty: true }}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
        />
      </GridItem>
      <GridItem xs={2} sm={2} md={2}>
        <SelectField
          label={<FormattedMessage {...messages.tableTitleName} />}
          name="name"
          options={[{ label: 'ALL', value: '__all__' }].concat(names)}
          inputProps={{ displayEmpty: true }}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
        />
      </GridItem>
    </GridContainer>
  </form>
);

export default EventsFilterForm;
