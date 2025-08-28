import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@mui/styles.js';
import FormControl from '@mui/material/FormControl.js';
import FormControlLabel from '@mui/material/FormControlLabel.js';
import FormLabel from '@mui/material/FormLabel.js';
import Switch from '@mui/material/Switch.js';
import Danger from 'components/Typography/Danger.js';

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
