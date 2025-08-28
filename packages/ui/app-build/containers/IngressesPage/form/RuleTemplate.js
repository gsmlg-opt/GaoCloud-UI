import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import ListItem from '@mui/material/ListItem.js';
import Button from '@mui/material/Button.js';
import IconButton from '@mui/material/IconButton.js';
import Table from '@mui/material/Table.js';
import TableHead from '@mui/material/TableHead.js';
import TableRow from '@mui/material/TableRow.js';
import TableBody from '@mui/material/TableBody.js';
import TableCell from '@mui/material/TableCell.js';

import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import SelectField from 'components/Field/SelectField.js';
import AddIcon from '@mui/icons-material/Add.js';
import PlusIcon from '../../../../app/images/icons/plusHl.svg';
import MinusIcon from 'components/Icons/Minus.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';


import useStyles from '../styles';
import messages from '../messages';

const RuleTemplate = ({
  fields,
  services,
  formValues,
  meta: { error, submitFailed },
}) => {
  const classes = useStyles();
  const serviceName = formValues && formValues.get('serviceName');
  const exposedPorts =
    services && services.getIn([serviceName, 'exposedPorts']);

  return (
    <Fragment>
      <Button
        color="secondary"
        onClick={(evt) =>
          exposedPorts
            .filter((p) => p.get('protocol') === 'tcp')
            .forEach((p) => {
              fields.push(
                fromJS({
                  serviceName,
                  serviceProtocol: 'tcp',
                  servicePort: p.get('port'),
                  protocol: 'HTTP',
                })
              );
            })
        }
        className={classes.formPlusIcon}
      >
        <img src={PlusIcon} alt='PlusIcon' />
      </Button>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      <Table className={classes.formTable}>
        <TableHead>
          <TableRow>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formHost} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formPath} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formProtocol} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServiceName} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServicePort} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formServiceProtocol} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formActions} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((f, i) => (
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.host`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.path`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.protocol`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.serviceName`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.servicePort`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <InputField
                  name={`${f}.serviceProtocol`}
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  disabled
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default RuleTemplate;
