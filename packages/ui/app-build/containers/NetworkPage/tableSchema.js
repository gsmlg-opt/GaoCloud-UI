import React from 'react';
import { ucfirst } from 'utils';
import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import ListItemText from '@mui/material/ListItemText.js';

const schema = ['ip', 'name'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
