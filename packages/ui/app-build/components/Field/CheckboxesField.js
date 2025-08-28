import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable.js';
import { Map, List } from 'immutable';

import FormControlLabel from '@mui/material/FormControlLabel.js';
import FormControl from '@mui/material/FormControl.js';
import FormLabel from '@mui/material/FormLabel.js';
import InputLabel from '@mui/material/InputLabel.js';
import FormHelperText from '@mui/material/FormHelperText.js';
import FormGroup from '@mui/material/FormGroup.js';
import Checkbox from '@mui/material/Checkbox.js';

const renderCheckboxesGroup = ({
  label,
  input,
  meta,
  classes,
  options,
  formControlProps,
  formControlComponent,
  formLabelProps,
  formLabelComponent,
  ...custom
}) => {
  const onChange = (event, ...args) => {
    let val = input.value || List([]);
    const { checked, value } = event.target;

    if (checked) {
      val = val.push(value);
    } else {
      val = val.filter((v) => v !== value);
    }
    input.onChange(val);
  };

  return (
    <FormControl
      component={formControlComponent}
      className={classes.formControl}
      {...formControlProps}
    >
      <FormLabel
        component={formLabelComponent}
        className={classes.formLabel}
        {...formLabelProps}
      >
        {label}
      </FormLabel>
      <FormGroup aria-label={label} className={classes.group}>
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox onChange={onChange} />}
            label={opt.label}
            value={opt.value}
            style={{ marginRight: '40px' }}
            {...opt}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

renderCheckboxesGroup.defaultProps = {
  classes: {},
  options: [],
  formControlProps: {},
  formControlComponent: 'fieldset',
  formLabelProps: {},
  formLabelComponent: 'legend',
};

const CheckboxesField = (props) => {
  const { component, ...rest } = props;
  let { options } = rest;
  if (options && Array.isArray(options)) {
    options = options.map((opt) => ({
      label: _.isString(opt) ? opt : opt.label,
      value: _.isString(opt) ? opt : opt.value,
    }));
  }

  return (
    <Field {...rest} component={renderCheckboxesGroup} options={options} />
  );
};

export default CheckboxesField;
