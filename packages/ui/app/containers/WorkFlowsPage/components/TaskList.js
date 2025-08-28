import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';

import messages from '../messages';
import useStyles from '../styles';
import { returnActiveStyle ,returnActiveIcon} from '../utils/utils';

export const TaskList = ({
  workFlowTasksList,
  changeTask,
}) => {
  const classes = useStyles();
 
  return (
    <Fragment>
      <List className={classes.list}>
        {workFlowTasksList && workFlowTasksList.toList().map((task,i)=>{
          const cSt = task.getIn(['status','currentStatus']);
          return  (
            <ListItem 
              className={returnActiveStyle(cSt,classes)} key={i}
              onClick={()=>{
                changeTask(task);
              }}
              style={{boxShadow:'0px -1px 0px 0px rgba(0,0,0,0.09)'}}
            >
              <ListItemAvatar>
                {returnActiveIcon(cSt,'list')}
              </ListItemAvatar>
              <ListItemText primary={task.get('id')} />
            </ListItem>
          )
        }
        )
        }
      </List>
    </Fragment>
  );
};

export default TaskList;
