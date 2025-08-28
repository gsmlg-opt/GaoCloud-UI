import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import Danger from '../../../components/Typography/Danger.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import InputField from '../../../components/Field/InputField.js';
import SelectField from '../../../components/Field/SelectField.js';
import PlusIcon from '../../../components/Icons/Plus.js';
import MinusIcon from '../../../components/Icons/Minus.js';

import useStyles from '../styles';
import messages from '../messages';

const VolumeClaimTemplate = ({
  fields,
  storageClasses,
  meta: { error, submitFailed },
  role,
}) => {
  const classes = useStyles();
  const storageClassesOptions = storageClasses.toList().map((sc) => ({
    label: sc.get('name'),
    value: sc.get('name'),
  }));

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          {role === 'update' ? null : (
            <Button
              className={classes.addNodeBtn}
              variant="contained" color="primary"
              onClick={(evt) => fields.push(fromJS({}))}
            >
              <AddIcon className={classes.plusIcon} />
              <FormattedMessage {...messages.formAddVolumeClaimTemplate} />
            </Button>
          )}
        </GridItem>
      </GridContainer>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => (
        <GridContainer key={i}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={
                <FormattedMessage {...messages.formVolumeClaimTemplateName} />
              }
              name={`${f}.name`}
              fullWidth
              inputProps={{ type: 'text', autoComplete: 'off' }}
              disabled={role === 'update'}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={
                <FormattedMessage {...messages.formVolumeClaimTemplateSize} />
              }
              name={`${f}.size`}
              fullWidth
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                endAdornment: role === 'update' ? null : 'Gi',
              }}
              disabled={role === 'update'}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <SelectField
              label={
                <FormattedMessage
                  {...messages.formVolumeClaimTemplateStorageClassName}
                />
              }
              name={`${f}.storageClassName`}
              formControlProps={{
                style: {
                  width: '100%',
                },
              }}
              classes={classes}
              options={storageClassesOptions}
              disabled={role === 'update'}
            />
          </GridItem>
          {role === 'update' ? null : (
            <GridItem
              xs={3}
              sm={3}
              md={3}
              className={classes.formLine}
              style={{ paddingTop: 10 }}
            >
              <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
              >
                <MinusIcon />
              </IconButton>
            </GridItem>
          )}
        </GridContainer>
      ))}
    </Fragment>
  );
};

export default VolumeClaimTemplate;
