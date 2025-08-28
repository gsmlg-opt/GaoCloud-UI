import React, { Fragment } from 'react';
import { ucfirst } from '../../../src/utils/index.js';
import TimeCell from '../../components/Cells/TimeCell.js';
import { Link } from 'react-router-dom';
import Button from '../../components/CustomButtons/Button.js';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete.js';

const schema = ['user', 'sourceAddress','resourceKind','resourcePath','operation','detail','creationTimestamp'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'detail') {
      return {
        ...item,
        component: ({ classes,data }) => (
          <span className={classes.details} title={data.get('detail')}>{data.get('detail')}</span>
        ),
      };
    }
    if (item.id === 'resourcePath') {
      return {
        ...item,
        component: ({ classes,data }) => (
          <span className={classes.details} title={data.get('resourcePath')}>{data.get('resourcePath')}</span>
        ),
      };
    }
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .map((sch) => sch)
  ;

export default tableSchema;
