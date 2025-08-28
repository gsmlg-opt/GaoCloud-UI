import React, { PureComponent, Fragment, useState ,useEffect} from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import LogView from '../../../components/Log/LogView.js';
import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';

import { useLogs } from 'hooks/logs';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Confirm from '../../../components/Confirm/Confirm.js';

import { returnActiveIcon, returnActiveColor } from '../utils/utils';

import messages from '../messages';
import useStyles from '../styles';

export const TaskTabs = ({
  workFlowTask,
  workFlowsTaskID,
  clearTasks,
  logUrl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const { open, close, logs } = useLogs();
  const currentStatus = workFlowTask && workFlowTask.getIn(['status','currentStatus']);
  const status = workFlowTask && workFlowTask.get('status');
  
  useEffect(()=>{
    if(logUrl){
      open(logUrl);
    };
    return () =>{
      close();
    };
  },[close, logUrl, open]);
  


  return (
    <Fragment>
      <div className={classes.titleWrap}>
        <h4>
          {returnActiveIcon(currentStatus,classes)}
          {workFlowsTaskID}
          <span className={returnActiveColor(currentStatus,classes)}>{currentStatus}</span>
        </h4>
        <Confirm
          handleConfirm={clearTasks}
          dialogContentText={messages.clearTasksPromptText}
          component={
            <Button
              variant="contained"
            >
              <FormattedMessage {...messages.clearTasks} />
            </Button>
          }
        />
      </div>
      <Card>
        <CardHeader style={{ paddingLeft:0 }}>
          <h4 className={classes.customCardHeaderH4}>
            <Tabs
              value={tab}
              onChange={(evt, idx) => setTab(idx)}
              textColor="inherit"
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab
                label={<FormattedMessage {...messages.tabTitleLogs} />}
              />
              <Tab
                label={<FormattedMessage {...messages.tabTitleStatus} />}
              />
            </Tabs>
          </h4>
        </CardHeader>
        <CardBody style={{ paddingLeft:0 }}>
          {tab === 0 ? (
            <Paper className={classes.logPaper}>
              {logs && logs.length>0 ? <LogView logs={logs} />: null}
            </Paper>
          ) : (
            <div>
              <p><FormattedMessage {...messages.tabContainerStatus} />:</p>
              {status && status.map((st,idx)=> (
                <div key={idx}>
                  <p>{idx} : {st}</p>
                </div>
              )).toList() 
              }
            </div>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default TaskTabs;
