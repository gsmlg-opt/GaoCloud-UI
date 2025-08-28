/**
 *
 * Events List
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles.js';
import Button from '@mui/material/Button.js';
import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';
import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import ListItemIcon from '@mui/material/ListItemIcon.js';
import ListItemText from '@mui/material/ListItemText.js';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction.js';
import ListItemAvatar from '@mui/material/ListItemAvatar.js';
import Avatar from '@mui/material/Avatar.js';
import Typography from '@mui/material/Typography.js';
import IconButton from '@mui/material/IconButton.js';
import NormalIcon from 'components/Icons/Normal.js';
import WarningIcon from 'components/Icons/Warning.js';
import MaxWindowIcon from 'components/Icons/MaxWindow.js';
import { useTheme } from '@mui/styles.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectLatestEvents } from '../../../app/ducks/events/selectors';
import * as actions from '../../../app/ducks/events/actions';

import messages from './messages';
import useStyles from './styles';

const EventsList = ({ clusterID, events }) => {
  const classes = useStyles();
  const theme = useTheme();

  const rEvents = events.reverse();

  return (
    <Paper className={classes.wrapper}>
      <List className={classes.list}>
        <ListItem className={classes.firstItem}>
          <IconButton component={Link} to={`/clusters/${clusterID}/events`}>
            <MaxWindowIcon
              style={{
                color: theme.palette.icons.e,
                transform: 'scale(0.65)',
              }}
            />
          </IconButton>
        </ListItem>
        {rEvents.map((evt, i) => (
          <ListItem className={classes.item} key={evt.id}>
            <ListItemAvatar className={classes.itemAvatar}>
              {evt.type === 'Warning' ? (
                <WarningIcon
                  style={{
                    color: theme.palette.icons.f,
                    transform: 'scale(0.85)',
                  }}
                />
              ) : (
                <NormalIcon
                  style={{
                    color: theme.palette.secondary.main,
                    transform: 'scale(0.85)',
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              className={classes.itemText}
              primary={
                <Typography className={classes.itemText1} component="div">
                  <Typography
                    className={classes.itemName}
                    component="div"
                    title={evt.name}
                  >
                    {evt.name}
                  </Typography>
                  <Typography
                    className={classes.itemReason}
                    component="div"
                    title={evt.reason}
                  >
                    {evt.reason}
                  </Typography>
                </Typography>
              }
              secondary={
                <Typography className={classes.itemText2} component="div">
                  <Typography
                    className={classes.itemMessage}
                    component="div"
                    title={evt.message}
                  >
                    {evt.message}
                  </Typography>
                  <Typography
                    className={classes.itemTime}
                    component="div"
                    title={evt.time}
                  >
                    {evt.time}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  events: makeSelectLatestEvents(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EventsList);
