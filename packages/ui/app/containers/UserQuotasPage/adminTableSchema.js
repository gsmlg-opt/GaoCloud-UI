import React, { Fragment } from 'react';
import { ucfirst } from '../../../src/utils/index.js';
import { Link } from 'react-router-dom';
import Button from '../../components/CustomButtons/Button.js';
import TimeCell from '../../components/Cells/TimeCell.js';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete.js';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const schema = [
  'status',
  'userName',
  'namespace',
  'cpu',
  'memory',
  'storage',
  'creationTimestamp',
  'responseTimestamp',
];

const adminTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'namespace') {
      return {
        ...item,
        component: ({ data ,classes}) =>  <span className={ data.get('status') === 'Deleting' ? classes.strikeout : null}>{ data.get('name')}</span>,
      };
    }
    return item;
  })
  .map((item) => {
    if (item.id === 'creationTimestamp' || item.id === 'responseTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({ data, removeUserQuota, setError }) => (
        <Fragment>
          <Button
            action
            to={`/userQuotas/${data.get('id')}/request`}
            component={Link}
            disabled={data.get('status') === 'Deleting'}
          >
            <FormattedMessage {...messages.detailsButton} />
          </Button>
          <ConfirmDelete
            actionName={removeUserQuota}
            id={data.get('id')}
            url={data.getIn(['links', 'remove'])}
            reject={(e) => setError(e)}
            disabled={data.get('status') === 'Deleting'}
          />
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'status') {
      return {
        ...sch,
        component: (props) => {
          switch (props.data.get('status')) {
            case 'processing':
              return <FormattedMessage {...messages.tableProcessing} />;
            case 'approval':
              return <FormattedMessage {...messages.tableApproval} />;
            case 'rejection':
              return <FormattedMessage {...messages.tableRejection} />;
            default:
              return props.data.get('status');
          }
        },
      };
    }
    return sch;
  });
export default adminTableSchema;
