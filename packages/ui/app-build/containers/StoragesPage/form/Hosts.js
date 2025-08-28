import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable.js';
import getByKey from '../../../../src/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import InputAdornment from '@mui/material/InputAdornment.js';
import Icon from '@mui/material/Icon.js';
import Checkbox from '@mui/material/Checkbox.js';
import FormControlLabel from '@mui/material/FormControlLabel.js';
import FormControl from '@mui/material/FormControl.js';
import InputLabel from '@mui/material/InputLabel.js';
import FormHelperText from '@mui/material/FormHelperText.js';
import FormGroup from '@mui/material/FormGroup.js';
import Table from '@mui/material/Table.js';
import TableHead from '@mui/material/TableHead.js';
import TableRow from '@mui/material/TableRow.js';
import TableBody from '@mui/material/TableBody.js';
import TableCell from '@mui/material/TableCell.js';

import Danger from 'components/Typography/Danger.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import messages from '../messages';

const Hosts = ({
  input,
  blockDevices,
  classes,
  fields,
  meta: { error, submitFailed },
}) => {
  const onChange = (event) => {
    let val = input.value;
    const { checked, value } = event.target;

    if (checked) {
      val = val.push(value);
    } else {
      val = val.filter((v) => v !== value);
    }
    input.onChange(val);
  };

  return (
    <Fragment>
      {submitFailed && error && (
        <GridContainer>
          <GridItem xs={3} sm={3} md={3} >
            <Danger>{error}</Danger>
          </GridItem>
        </GridContainer>
      )}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: 80 }}
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            ></TableCell>
            <TableCell
              style={{ minWidth: 80 }}
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formNodeName} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formBlockDevices} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blockDevices.map((b, i) => (
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>
                <Checkbox
                  checked={input.value.includes(b && b.get('nodeName'))}
                  onChange={onChange}
                  value={b && b.get('nodeName')}
                  color="primary"
                />
              </TableCell>
              <TableCell className={`${classes.tableCell}`}>
                {b && b.get('nodeName')}
              </TableCell>
              <TableCell
                className={`${classes.tableCell}`}
                style={{ wordBreak: 'break-all' }}
              >
                {b &&
                  b.get('blockDevices') &&
                  b.get('blockDevices').map((bd, j) => (
                    <span key={j} style={{ marginRight: 18 }}>
                      <span>{bd.get('name')}</span>
                      <span>({bd.get('size')}GiB)</span>
                    </span>
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default Hosts;
