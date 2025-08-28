import React, { Fragment, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Danger from '../Typography/Danger.js';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';

const CustomCheckbox = ({
  label,
  disabled,
  classes,
  inputProps,
  meta,
  input,
  fullWidth,
  ...custom
}) => {
  const { touched, invalid, error } = meta || {};
  const [checked, setChecked] = useState(input.value);
  const onChange = (event, ...args) => {
    setChecked(!checked);
    input.onChange(checked);
  };
  return (
    <FormControl fullWidth={fullWidth}>
      <FormControlLabel
        control={<Checkbox onChange={onChange} />}
        value={checked}
        label={label}
        checked={checked}
        disabled={disabled}
        {...input}
        {...custom}
        {...inputProps}
      />
      {touched && error && <Danger>{error}</Danger>}
    </FormControl>
  );
};
CustomCheckbox.defaultProps = {
  meta: {},
  inputProps: {},
};



export default CustomCheckbox;
