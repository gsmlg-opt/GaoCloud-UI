import React from 'react';
import { Field } from 'redux-form/immutable.js';
import Checkbox from 'components/CustomCheckbox/CustomCheckbox.js';

const CheckboxComponent = ({
  label,
  input,
  classes,
  meta,
  inputProps,
  ...custom
}) => (
  <Checkbox
    label={label}
    input={input}
    inputProps={{
      ...input,
      ...inputProps,
    }}
    {...custom}
    meta={meta}
  />
);

const CheckboxField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={CheckboxComponent} />;
};

export default CheckboxField;
