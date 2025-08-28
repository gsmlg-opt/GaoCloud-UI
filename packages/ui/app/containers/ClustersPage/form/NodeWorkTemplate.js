import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import Danger from '../../../components/Typography/Danger.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import InputField from '../../../components/Field/InputField.js';
import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import CheckboxesField from '../../../components/Field/CheckboxesField.js';
import PlusIcon from '../../../components/Icons/Plus.js';
import MinusIcon from '../../../components/Icons/Minus.js';

import messages from '../messages';

const NodeWorkTemplate = ({
  fields,
  classes,
  meta: { error, submitFailed },
}) =>  (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
        <Button
          className={classes.addNodeBtn}
          variant="contained" color="primary"
          onClick={(evt) =>
            fields.push(fromJS({ name: '', address: '', roles: [] }))
          }
        >
          <AddIcon className={classes.plusIcon} />
          <FormattedMessage {...messages.formAddWorkNode} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card  border={fields&&fields.length>0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i+1}>
            <GridItem xs={2} sm={2} md={2} className={classes.checkboxes} >
              <CheckboxesField
                name={`${f}.roles`}
                label=""
                id={i}
                classes={{
                  formControl: classes.chexboxesControl,
                  formLabel: classes.chexboxesLabel,
                  group: classes.chexboxesGroup,
                }}
                options={[
                  {
                    label: <FormattedMessage {...messages.formBoundaryNode} />,
                    value: 'edge',
                  },
                ]}
                formControlComponent="div"
                formLabelComponent="div"
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.formHostName} />}
                name={`${f}.name`}
                fullWidth
                inputProps={{ type: 'text', autoComplete: 'off' }}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <InputField
                label="IP"
                name={`${f}.address`}
                fullWidth
                inputProps={{
                  type: 'text',
                  autoComplete: 'off',
                }}
              />
            </GridItem>
            <GridItem
              xs={3}
              sm={3}
              md={3}
              className={classes.formLine}
              style={{ paddingTop: 7 }}
            >
              <IconButton
                variant="contained" onClick={(evt) => 
                  fields.remove(i)
                }>
                <MinusIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
  </Fragment>
);

export default NodeWorkTemplate;
