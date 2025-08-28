import React, { useCallback, useState } from 'react';
import { Field } from 'redux-form/immutable.js';
// import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControl from '@mui/material/FormControl.js';
import Button from 'components/CustomButtons/Button.js';
import { readAsText } from '../../../src/utils/readFile';

const Input = ({ label, input, classes, meta, buttonProps, ...custom }) => {
  const [node, setNode] = useState(null);
  const measuredRef = useCallback((n) => {
    if (n !== null) {
      setNode(n);
    }
  }, []);

  return (
    <FormControl className={classes.root} {...custom}>
      <input
        ref={measuredRef}
        style={{ display: 'none' }}
        type="file"
        onChange={(evt) => {
          const file = evt.target.files[0];
          readAsText(file).then((content) => {
            input.onChange(content);
          });
        }}
      />
      <Button
        {...buttonProps}
        className={classes.button}
        onClick={(evt) => {
          if (node) {
            node.click();
          }
        }}
      >
        {label}
      </Button>
    </FormControl>
  );
};

Input.defaultProps = {
  classes: {},
  buttonProps: {},
};

const FileReaderField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={Input} />;
};

export default FileReaderField;
