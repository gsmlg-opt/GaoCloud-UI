import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage, useIntl } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import Danger from '../../../components/Typography/Danger.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import SelectField from '../../../components/Field/SelectField.js';
import PlusIcon from '../../../images/icons/plusHl.svg';
import MinusIcon from '../../../components/Icons/Minus.js';
import ReadOnlyInput from '../../../components/CustomInput/ReadOnlyInput.js';

import messages from '../messages';
import useStyles from '../styles';
import {
  renderNumerical,
  renderMetricsName,
  renderMetricsItem,
  renderTargetTypeOptions,
  renderMetricsTypeValue,
} from '../utils/utils';

const Metrics = ({
  fields,
  meta: { error, submitFailed },
  formValues,
  worklodMetrics,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <List component="ul" style={{ width: '100%' }}>
      <ListItem>
        <ListItemText>
          <Button
            className={classes.formPlusIcon}
            color="secondary"
            onClick={(evt) => {
              const metricsType = formValues && formValues.get('metricsType');
              return fields.push(renderMetricsItem(metricsType));
            }}
          >
            <img src={PlusIcon} alt='PlusIcon' />
          </Button>
        </ListItemText>
      </ListItem>

      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => {
        const metricsType =
          formValues && formValues.getIn(['metrics', i, 'metricsType']);
        const metricsTypeValue = renderMetricsTypeValue(metricsType);
        return (
          <ListItem key={i} className={classes.listItem}>
            <Card key={i} border>
              <CardBody>
                <ListItemText>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formMetricsType} />
                        }
                        fullWidth
                        value={
                          metricsTypeValue &&
                          intl.formatMessage(metricsTypeValue)
                        }
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {renderMetricsName(f, i, formValues, worklodMetrics)}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formTargetType} />
                        }
                        name={`${f}.targetType`}
                        formControlProps={{
                          style: {
                            width: '100%',
                          },
                        }}
                        options={renderTargetTypeOptions(metricsType)}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {renderNumerical(f, i, formValues)}
                    </GridItem>
                  </GridContainer>
                </ListItemText>
              </CardBody>
            </Card>

            <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
              <MinusIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Metrics;
