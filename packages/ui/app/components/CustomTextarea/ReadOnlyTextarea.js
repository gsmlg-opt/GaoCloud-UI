import React from 'react';
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from 'classnames';
// @mui/material components
import { withStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import customInputStyle from './styles';

function ReadOnlyTextarea({ ...props }) {
  const {
    classes,
    formControlProps,
    id,
    label,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    value,
    fullWidth,
  } = props;
  const labelClasses = classNames({});
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses} fullWidth>
      <TextField
        label={label}
        id={id}
        margin="normal"
        variant="outlined"
        multiline
        disabled
        value={`${value == null ? '' : value}`}
        {...inputProps}
      />
    </FormControl>
  );
}



export default withStyles(customInputStyle)(ReadOnlyTextarea);
