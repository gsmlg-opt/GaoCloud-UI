import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '../../components/Icons/Close.js';
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Paper from '@mui/material/Paper';
import LogView from '../../components/Log/LogView.js';

import { useLogs } from 'hooks/logs';

import { makeSelectCurrentID } from '../../ducks/clusters/selectors.js';
import * as actions from '../../ducks/clusters/actions.js';

import useStyles from './styles';
import messages from './messages';

const LogViewDialog = ({ isOpen, id, closeDialog }) => {
  const classes = useStyles();
  const { protocol, hostname, port } = window.location;
  const url = `${
    protocol === 'https:' ? 'wss:' : 'ws:'
  }//${hostname}:${port}/apis/ws.gaocloud.cn/v1/clusters/${id}/zkelog`;
  const { open, close, logs } = useLogs();

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      onEnter={() => {
        open(url);
      }}
      onExit={() => {
        close();
      }}
      maxWidth="lg"
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4>
            <FormattedMessage {...messages.logTitle} />
          </h4>
          <IconButton onClick={closeDialog} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.logCardBody}>
          <Paper className={classes.logCardBodyPaper}>
            <LogView logs={logs} />
          </Paper>
        </CardBody>
        <CardFooter>
          <Button onClick={closeDialog} color="primary" variant="contained">
            <FormattedMessage {...messages.logClose} />
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  id: makeSelectCurrentID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LogViewDialog);
