import React, { Fragment } from 'react';
// nodejs library to set properties for components
// @mui/material components
import withStyles from '@mui/styles.js';
import GridItem from 'components/Grid/GridItem.js';
import WarningIcon from 'components/Icons/ErrorWarning.js';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton.js';
import closeIcon from '../../../app/images/close.png';
import messages from './messages';
import customErrorStyle from './styles';

function ErrorInfo({ ...props }) {
  const { classes, errorText, close } = props;
  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.errorWrap}>
          <WarningIcon className={classes.warningIcon} />
          {close ? (
            <IconButton className={classes.closeIcon} onClick={close}>
              <img alt="close" src={closeIcon} />
            </IconButton>
          ) : null}
          <p className={classes.errorTitle}>
            <FormattedMessage {...messages.warningTitle} />
          </p>
          <p className={classes.errorText}>{errorText}</p>
        </div>
      </GridItem>
    </Fragment>
  );
}



export default withStyles(customErrorStyle)(ErrorInfo);
