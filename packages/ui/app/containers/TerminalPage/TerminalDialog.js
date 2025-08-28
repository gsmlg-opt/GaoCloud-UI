/**
 *
 * Terminal Dialog
 *
 */

import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@mui/material/Paper';
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '../../components/Icons/Close.js';

import { makeSelectTermUrl } from '../../ducks/app/selectors.js';
import * as actions from '../../ducks/app/actions.js';

import { useTerm } from 'hooks/term';

import messages from './messages';
import useStyles from './styles';

export const TerminalDialog = ({ url, closeTerminal }) => {
  const classes = useStyles();
  const { open, close, ref } = useTerm();

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="md"
      open={Boolean(url)}
      onEnter={() => {
        open(url);
      }}
      onExit={() => {
        close();
      }}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4>
            <FormattedMessage {...messages.header} />
          </h4>
          <IconButton onClick={closeTerminal} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper className={classes.dialogCardBodyPaper} ref={ref} />
        </CardBody>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectTermUrl(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TerminalDialog);
