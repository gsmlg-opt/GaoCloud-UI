import _ from 'lodash';
import React from 'react';
import { Field } from 'redux-form/immutable.js';
import InputLabel from '@mui/material/InputLabel.js';
import MenuItem from '@mui/material/MenuItem.js';
import FormHelperText from '@mui/material/FormHelperText.js';
import FormControl from '@mui/material/FormControl.js';
import Select from '@mui/material/Select.js';

const SelectComponent = ({
  label,
  input,
  classes,
  disabled,
  meta: { touched, invalid, error },
  inputProps,
  labelProps,
  formControlProps,
  options,
  fullWidth,
  ...custom
}) => (
  <FormControl
    {...formControlProps}
    error={touched && error}
    disabled={disabled}
    fullWidth={fullWidth}
  >
    <InputLabel htmlFor="" {...labelProps} error={touched && error}>
      {label}
    </InputLabel>
    <Select {...input} {...inputProps} error={touched && error}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt.value}>
          <span
            title={opt.label}
            style={{
              maxWidth: 400,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            {opt.label}
          </span>
        </MenuItem>
      ))}
    </Select>
    {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
  </FormControl>
);

SelectComponent.defaultProps = {
  options: [],
};

const SelectField = (props) => {
  const { component, ...rest } = props;
  let { options } = rest;
  if (options && Array.isArray(options)) {
    options = options.map((opt) => ({
      label: _.isString(opt) ? opt : opt.label,
      value: _.isString(opt) ? opt : opt.value,
    }));
  }

  return <Field {...rest} component={SelectComponent} options={options} />;
};

export default SelectField;
