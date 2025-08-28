import React, { Fragment, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel.js';
import Danger from 'components/Typography/Danger.js';
import Checkbox from '@mui/material/Checkbox.js';
import FormControl from '@mui/material/FormControl.js';

const ReadOnlyCheckbox = ({
  labelText,
  disabled,
  classes,
  inputProps,
  meta,
  input,
  value,
  fullWidth,
  ...custom
}) => (
  <FormControl fullWidth={fullWidth}>
    <FormControlLabel
      control={<Checkbox />}
      value={value}
      label={labelText}
      checked={value}
      disabled
      {...input}
      {...custom}
    />
  </FormControl>
);



export default ReadOnlyCheckbox;
