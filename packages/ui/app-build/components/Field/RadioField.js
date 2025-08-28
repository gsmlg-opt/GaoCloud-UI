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
import Radio from '@mui/material/Radio.js';
import RadioGroup from '@mui/material/RadioGroup.js';

const renderRadioGroup = ({
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
  const onChange = (...args) => {
    input.onChange(...args);
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
      <RadioGroup
        aria-label={label}
        className={classes.group}
        value={input.value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            control={<Radio />}
            label={opt.label}
            value={opt.value}
            {...opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

renderRadioGroup.defaultProps = {
  classes: {},
  options: [],
  formControlProps: {},
  formControlComponent: 'fieldset',
  formLabelProps: {},
  formLabelComponent: 'legend',
};

const RadioField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderRadioGroup} />;
};

export default RadioField;
