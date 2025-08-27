import React from 'react';
import { ucfirst } from '@gsmlg/utils';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const schema = ['ip', 'name'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
