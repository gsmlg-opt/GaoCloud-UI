import React, { Fragment, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Danger from 'components/Typography/Danger';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';

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
