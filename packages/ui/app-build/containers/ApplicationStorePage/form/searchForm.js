import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable.js';
import getByKey from '../../../../src/utils/getByKey';

import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';

import useStyles from '../styles';
import messages from '../messages';

const SearchForm = ({ handleSubmit, error }) => {
  const classes = useStyles();
  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.searchFormApplicationName} />}
            name="name"
            formControlProps={{
              className: classes.nameControl,
              style: {
                width: '100%',
              },
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default SearchForm;
