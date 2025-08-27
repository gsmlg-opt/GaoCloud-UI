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
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import Danger from 'components/Typography/Danger';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import messages from '../messages';

const Initiators = ({
  input,
  nodes,
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
              style={{ minWidth: 80 }}
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.formNodeAddress} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.filter((node) => node.get('roles').includes('worker')).map((node, i) => (
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>
                <Checkbox
                  checked={input.value.includes(node && node.get('name'))}
                  onChange={onChange}
                  value={node && node.get('name')}
                  color="primary"
                />
              </TableCell>
              <TableCell className={`${classes.tableCell}`}>
                {node && node.get('name')}
              </TableCell>
              <TableCell className={`${classes.tableCell}`}>
                {node && node.get('address')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default Initiators;
