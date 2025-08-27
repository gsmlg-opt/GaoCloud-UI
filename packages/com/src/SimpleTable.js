/**
 *
 * SimpleTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const SimpleTable = ({
  schema,
  data,
  ...extras
}) => {
  const getKey = (data, key) => {
    if (data && data.get && typeof data.get === 'function') {
      return data.get(key);
    } else if (typeof data === 'object') {
      return data[key];
    }
    return null;
  };

  return (
    <Table {...extras}>
      <TableHead>
        <TableRow>
          {schema.map((column) => (
            <TableCell key={getKey(column, 'id')} component="th">
              {getKey(column, 'label')}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((rowData, index) => (!!rowData ? (
          <TableRow key={index}>
            {schema.map((column) => {
              const CustomComponent = getKey(column, 'component');
              return (
                <TableCell key={getKey(column, 'id')}>
                  {(CustomComponent != null) ? (
                    <CustomComponent
                      {...(column.props || {})}
                      index={index}
                      data={rowData}
                      column={column}
                      id={getKey(column, 'id')}
                      value={getKey(rowData, getKey(column, 'id'))}
                    />
                  ) : `${getKey(rowData, getKey(column, 'id'))}`}
                </TableCell>
              );
            })}
          </TableRow>
        ) : null)).filter((d) => d)}
      </TableBody>
    </Table>
  );
};

SimpleTable.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  })).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default SimpleTable;
