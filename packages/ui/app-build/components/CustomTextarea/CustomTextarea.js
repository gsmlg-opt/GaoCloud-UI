import React from 'react';
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from 'classnames';
// @mui/material components
import withStyles from '@mui/styles.js';
import FormControl from '@mui/material/FormControl.js';
import FormHelperText from '@mui/material/FormHelperText.js';
import TextField from '@mui/material/TextField.js';

import customInputStyle from './styles';

function CustomTextarea({ ...props }) {
  const {
    classes,
    formControlProps,
    id,
    labelText,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    success,
    meta: { touched, invalid, error },
  } = props;

  const touchedError = !!(touched && error);

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
    <FormControl
      {...formControlProps}
      className={formControlClasses}
      error={touchedError}
    >
      <TextField
        label={labelText}
        error={touchedError}
        id={id}
        margin="normal"
        variant="outlined"
        multiline
        {...inputProps}
      />
      {touchedError ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

CustomTextarea.defaultProps = {
  meta: {},
  inputProps: {},
};



export default withStyles(customInputStyle)(CustomTextarea);
