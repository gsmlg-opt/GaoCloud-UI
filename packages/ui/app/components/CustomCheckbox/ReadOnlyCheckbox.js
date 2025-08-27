import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
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

ReadOnlyCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  meta: PropTypes.object,
};

export default ReadOnlyCheckbox;
