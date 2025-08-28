import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Danger from '../Typography/Danger.js';

const IOSSwitch = ({ ...props }) => {
  const {
    label,
    disabled,
    checked,
    onChange,
    value,
    classes,
    inputProps,
    meta,
    ...custom
  } = props;
  const { touched, invalid, error } = meta || {};

  return (
    <>
      <FormControlLabel
        {...custom}
        disabled={disabled}
        control={
          <Switch
            {...inputProps}
            disabled={disabled}
            disableRipple
            checked={checked}
            onChange={onChange}
            value={value}
          />
        }
        label={label}
      />
      {touched && error && <Danger>{error}</Danger>}
    </>
  );
};

export default IOSSwitch;
