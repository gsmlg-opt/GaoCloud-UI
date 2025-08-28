import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import Button from '@mui/material/Button.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from '@mui/icons-material/Add.js';

import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import MinusIcon from 'components/Icons/Minus.js';

import messages from '../messages';

export const Envs = ({
  fields,
  classes,
  meta: { error, submitFailed },
  role,
}) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        {role === 'update' ? (
          <p ><FormattedMessage {...messages.formEnvBtn} /></p>
        ) : (
          <Button
            className={classes.addNodeBtn}
            variant="contained" color="primary"
            onClick={(evt) =>
              fields.push(fromJS({}))
            }
            style={{ marginBottom: fields && fields.length > 0 ? 25 : 0 }}
          >
            <AddIcon className={classes.plusIcon} />
            <FormattedMessage {...messages.formEnvBtn} />
          </Button>
        )}
       
      </GridItem>
    </GridContainer>
    <Card  className={classes.addList} border={fields && fields.length > 0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.name`}
                fullWidth
                label={<FormattedMessage {...messages.formEnvName} />}
              />
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.value`}
                fullWidth
                label={<FormattedMessage {...messages.formEnvValue} />}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              {role === 'update' ? null : <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
                className={classes.minusIcon}
              >
                <MinusIcon />
              </IconButton>}
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
     
  </Fragment>
);

export default Envs;
