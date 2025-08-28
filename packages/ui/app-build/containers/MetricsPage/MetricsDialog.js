/**
 *
 * MetricsDialog
 *
 */
import React, { useEffect, useState, Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fromJS } from 'immutable';
import { usePush } from 'hooks/router.js';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import CButton from 'components/CustomButtons/Button.js';
import Button from '@mui/material/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Dialog from '@mui/material/Dialog.js';
import CloseIcon from 'components/Icons/Close.js';
import CardFooter from 'components/Card/CardFooter.js';
import IconButton from '@mui/material/IconButton.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import * as actions from '../../../app/ducks/metrics/actions';

import useStyles from './styles';
import messages from './messages';
import MetricsTable from './Table';

import { refactorWorklodaMetrics } from '../../utils/hpa';

const MetricsDialog = ({
  clusterID,
  namespaceID,
  loadMetrics,
  url,
  id,
  type,
  disabled,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const push = usePush();
  const [selected, setSelected] = useState([]);

  const metrics = refactorWorklodaMetrics(current);

  const handleSetHpa = () => {
    const selectMetrics = [];
    if (selected.length > 0) {
      selected.forEach((nameLabels) => {
        const name = nameLabels.split(' ')[0];
        metrics.forEach((item) => {
          if (item.get('name') === name) {
            selectMetrics.push({
              name: nameLabels,
              value: item.get('value'),
            });
          }
        });
      });
    }
    push(
      `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers/create?checked=true&targetScaleKind=${type}&targetScaleName=${id}&selectMetrics=${encodeURIComponent(
        JSON.stringify(selectMetrics)
      )}`
    );
    setCurrent(null);
    setOpen(false);
  };

  return (
    <Fragment>
      <CButton
        action
        onClick={() => {
          setCurrent(null);
          if (url && id) {
            loadMetrics(url, {
              clusterID,
              namespaceID,
              id,
              resolve({ response }) {
                setCurrent(response.data);
              },
              reject() {},
            });
          }
          setOpen(true);
        }}
        disabled={disabled}
      >
        <FormattedMessage {...messages.metricBtn} />
      </CButton>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => {
          setCurrent(null);
          setOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="light" className={classes.dialogHeader}>
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.metrics} />
            </h4>
            <IconButton onClick={() => setOpen(false)} style={{ padding: 0 }}>
              <CloseIcon />
            </IconButton>
          </CardHeader>
          <CardBody className={classes.dialogCardBody}>
            {current ? (
              <MetricsTable
                data={metrics}
                setSelected={setSelected}
                selected={selected}
                type={type}
              />
            ) : null}
          </CardBody>
          <CardFooter className={classes.dialogCardFooter}>
            {type !== 'daemonset' ? (
              <Button
                onClick={() => handleSetHpa()}
                color="primary"
                variant="contained"
              >
                <FormattedMessage {...messages.setHPABtn} />
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MetricsDialog);
