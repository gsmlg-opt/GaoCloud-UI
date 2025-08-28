/**
 *
 * LogsPage
 *
 */
import React, { useEffect, useState, memo,useCallback } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fromJS } from 'immutable';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import TrueIcon from '../../components/Icons/True.js';
import FalseIcon from '../../components/Icons/False.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import { makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL as makeSelectWorkFlowsURL,
} from '../../ducks/workFlows/selectors.js';
import {
  makeSelectURL,
  makeSelectWorkFlowTasks,
} from '../../ducks/workFlowTasks/selectors.js';
import * as actions from '../../ducks/workFlowTasks/actions.js';
import * as wActions from '../../ducks/workFlows/actions.js';

import { useLogs } from 'hooks/logs';
import useStyles from './styles';
import messages from './messages';


import TaskTabs from './components/TaskTabs';
import TaskStatus from './components/TaskStatus';
import TaskList from './components/TaskList';
import { returnTime } from './utils/utils';

const LogsPage = ({
  clusterID,
  namespaceID,
  location,
  workFlowsURL,
  url,
  readWorkFlowTask,
  workFlowID,
  readWorkFlow,
  workFlow,
  loadWorkFlowTasks,
  workFlowTasksList,
  executeWorkFlowAction,
}) => {
  const classes = useStyles();
  const { open, close, logs } = useLogs();

  const firstWorkFlowTask = workFlowTasksList && workFlowTasksList.first();

  const [logUrl, setLogUrl] = useState('');
  const [workFlowTask, setWorkFlowTask] = useState(null);
  const [workFlowsTaskID, setWorkFlowsTaskID] = useState(null);

  const workFlowsTaskURL = workFlowTask && workFlowTask.getIn(['links','self']);
  const { protocol, hostname, port } = window.location;

  useEffect(() => { 
    if(firstWorkFlowTask){
      changeTask(firstWorkFlowTask);
    };
  }, [changeTask, firstWorkFlowTask]);

  useEffect(() => {
    if (workFlowsURL) {
      readWorkFlow(workFlowID, {
        clusterID,
        namespaceID,
        url: `${workFlowsURL}/${workFlowID}`,
      });
    }
  }, [clusterID, namespaceID, readWorkFlow, workFlowID, workFlowsURL]);

  useEffect(() => {
    if (url) {
      loadWorkFlowTasks(url, {
        clusterID,
        namespaceID,
        workFlowID,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, loadWorkFlowTasks, namespaceID, url, workFlowID]);

  useEffect(() => {
    if (workFlowsTaskURL) {
      readWorkFlowTask(workFlowsTaskURL, {
        clusterID,
        namespaceID,
        workFlowID,
        url: `${workFlowsTaskURL}`,
      });
    }
    const t = setInterval(() => {
      if (workFlowsTaskURL) {
        readWorkFlowTask(workFlowsTaskURL, {
          clusterID,
          namespaceID,
          workFlowID,
          url: `${workFlowsTaskURL}`,
        });
      }
    }, 3000);

    return () => {
      clearInterval(t);
    };
  }, [clusterID, namespaceID, readWorkFlowTask, workFlowID, workFlowsTaskURL]);

  const changeTask = useCallback((task) => {
    const taskID = task && task.get('id');
    setWorkFlowTask(task);
    setWorkFlowsTaskID(taskID);
    if(taskID){
      setLogUrl(`${
        protocol === 'https:' ? 'wss:' : 'ws:'
      }//${hostname}:${port}/apis/ws.gaocloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/workflows/${workFlowID}/workflowtasks/${taskID}/log`)
    }
  }, [clusterID, hostname, namespaceID, port, protocol, workFlowID]);

  const clearTasks =()=> {
    executeWorkFlowAction('emptytask',null,{
      url: workFlow.getIn(['links', 'self']),
      resolve(){
        setWorkFlowTask(null);
        loadWorkFlowTasks(url, {
          clusterID,
          namespaceID,
          workFlowID,
        });
      }, 
      reject(){},
    });
  };



  return (
    <div className={classes.root}>
      <Helmet title={messages.logsPageTitle} description={messages.logsPageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.logsPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <TaskStatus 
            workFlowID={workFlowID} 
            workFlowTask={workFlowTask}
            workFlowTasksList={workFlowTasksList}
          />
          {workFlowTasksList.size>0 ?  <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.headerTitle}>
                  {workFlowsTaskID}
                  <span>{returnTime(workFlowTask && workFlowTask.get('creationTimestamp'))}</span>
                </h4>
              </CardHeader>
              <CardBody>
                <div className={classes.taskContent}>
                  <div className={classes.taskList}>
                    <TaskList 
                      workFlowTasksList={workFlowTasksList}
                      changeTask={changeTask}
                    />
                  </div>
                  <div className={classes.tasktabs}>
                    <TaskTabs 
                      workFlowTask={workFlowTask}
                      workFlowsTaskID={workFlowsTaskID}
                      logUrl={logUrl}
                      clearTasks={clearTasks}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>: null}
        </GridContainer>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  workFlowsURL:makeSelectWorkFlowsURL(),
  url: makeSelectURL(),
  workFlow: makeSelectCurrent(),
  workFlowID:makeSelectCurrentID(),
  workFlowTasksList:makeSelectWorkFlowTasks(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      readWorkFlow:wActions.readWorkFlow,
      executeWorkFlowAction:wActions.executeWorkFlowAction,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(LogsPage);
