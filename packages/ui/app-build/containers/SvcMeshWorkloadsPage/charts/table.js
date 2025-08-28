import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Table from '@mui/material/Table.js';
import TableHead from '@mui/material/TableHead.js';
import TableRow from '@mui/material/TableRow.js';
import TableBody from '@mui/material/TableBody.js';
import TableCell from '@mui/material/TableCell.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import LinearProgress from '@mui/material/LinearProgress.js';

import messages from '../messages';
import useStyles from '../styles';
import {
  getRPS,
  getLatency,
  getSR,
  getSRClassName,
  getSuccessRate,
} from '../../../utils/svcMesh';

const SvcMeshChartTable = ({ data, type }) => {
  const classes = useStyles();
  const sr = getSR(data, classes);
  const srClassName = getSRClassName(sr, classes);
  return (
    <Fragment>
      <Card
        className={
          type === 'neighbor' ? classes.neighborNode : classes.centerNode
        }
      >
        <CardHeader className={classes.tableCardHeader}>
          <h4 className={classes.h4}>
            {(data && data.getIn(['resource', 'type'])) || '--'} /
            {(data && data.getIn(['resource', 'name'])) || '--'}
          </h4>
          <div className={classes.linearProgressWrap}>
            <div>
              <LinearProgress
                variant="determinate"
                value={sr}
                classes={{
                  barColorPrimary: srClassName,
                  colorPrimary: classes.gray,
                }}
              />
            </div>
            <span>{sr}%</span>
          </div>
        </CardHeader>
        <CardBody>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <FormattedMessage {...messages.chartTableTitleSR} />
                </TableCell>
                <TableCell className={classes.tableCell}>{sr}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <FormattedMessage {...messages.chartTableTitleRPS} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {getRPS(data)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <FormattedMessage {...messages.chartTableTitleP99} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {getLatency(data, 'latencyMsP99')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SvcMeshChartTable;
