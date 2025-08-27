import React from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from 'utils/getByKey';
import classNames from 'classnames';

import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import People from '@mui/icons-material/People';

import Button from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import Danger from 'components/Typography/Danger';
import UserIcon from 'components/Icons/User';
import PasswordIcon from 'components/Icons/Password';

import loginLogo from 'images/login-logo.jpg';

import messages from './messages';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const UsernameField = ({ label, input, meta, inputProps, cns, ...custom }) => (
  <CustomInput
    id="login-username"
    classes={{ input: cns.input, underline: cns.inputUnderline }}
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'text',
      autoComplete: 'username',
      endAdornment: (
        <InputAdornment position="end">
          <UserIcon
            className={classNames({
              [cns.inputIconsColor]: true,
              [cns.inputIconsError]: !!(meta.touched && meta.error),
              [cns.inputIconsSuccess]:
                custom.success && !(meta.touched && meta.error),
            })}
          />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const PasswordField = ({ label, input, meta, inputProps, cns, ...custom }) => (
  <CustomInput
    id="login-password"
    classes={{ input: cns.input, underline: cns.inputUnderline }}
    labelText={label}
    meta={meta}
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      ...input,
      type: 'password',
      autoComplete: 'current-password',
      endAdornment: (
        <InputAdornment position="end">
          <PasswordIcon
            className={classNames({
              [cns.inputIconsColor]: true,
              [cns.inputIconUp]: true,
              [cns.inputIconsError]: !!(meta.touched && meta.error),
              [cns.inputIconsSuccess]:
                custom.success && !(meta.touched && meta.error),
            })}
          />
        </InputAdornment>
      ),
      ...inputProps,
    }}
    {...custom}
  />
);

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, error, classes } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <CardHeader color="none" className={classes.cardHeader}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="85">
          <g transform="scale(0.3)">
            <polygon
              fill="#209cce"
              points="115.95 156.57 0 156.57 51.16 108.87 165.9 108.87 115.95 156.57"
            />
            <polygon
              fill="none"
              stroke="#209cc3"
              strokeWidth="1.42"
              points="52.29 107.56 1.41 154.97 117.85 44.91 166.62 0.53 52.29 107.56"
            />
            <polygon
              fill="#6fc493"
              points="115.95 47.38 115.95 156.57 165.9 108.87 165.9 0.34 115.95 47.38"
            />
            <polygon
              fill="#209cce"
              points="115.95 47.38 0 47.38 51.16 0.34 165.9 0.34 115.95 47.38"
            />
            <text
              fontSize="56"
              fill="#618297"
              fontFamily="ArialMT, Arial"
              transform="translate(0 240)"
            >
              GaoCloud
            </text>
          </g>
        </svg>
      </CardHeader>
      <CardBody>
        <Field
          name="username"
          component={UsernameField}
          label={<FormattedMessage {...messages.username} />}
          cns={classes}
          fullWidth
        />
        <Field
          name="password"
          component={PasswordField}
          label={<FormattedMessage {...messages.password} />}
          cns={classes}
          fullWidth
        />
      </CardBody>
      {error ? (
        <CardBody className={classes.cardFooter}>
          <Danger error={error}>
            {getByKey(error, ['response', 'message'])}
          </Danger>
        </CardBody>
      ) : null}
      <CardFooter className={classes.cardFooter}>
        <Button
          simple
          fullWidth
          type="submit"
          size="lg"
          className={classes.submitButton}
        >
          <FormattedMessage {...messages.signIn} />
        </Button>
      </CardFooter>
    </form>
  );
};

const withForm = reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate,
});

export default compose(withForm)(LoginForm);
