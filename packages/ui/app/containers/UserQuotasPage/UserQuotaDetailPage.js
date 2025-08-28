/**
 *
 * UserQuotaDetailPage
 *
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import ReadOnlyInput from '../../components/CustomInput/ReadOnlyInput.js';
import ReadOnlyTextarea from '../../components/CustomTextarea/ReadOnlyTextarea.js';
import Helmet from '../../components/Helmet/Helmet.js';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import {
  makeSelectCurrent,
  makeSelectURL,
  makeSelectCurrentID,
} from '../../ducks/userQuotas/selectors.js';
import * as actions from '../../ducks/userQuotas/actions.js';

import messages from './messages';
import useStyles from './styles';

const UserQuotaDetailPage = ({
  userQuota,
  url,
  readUserQuota,
  userQuotaID,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      readUserQuota(userQuotaID, {
        url: `${url}/${userQuotaID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [readUserQuota, url, userQuotaID]);

  const reg = /^(\d+)([a-zA-Z]+)?$/;
  const memory = userQuota.get('memory');
  const storage = userQuota.get('storage');
  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/userQuotas`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.detail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.detail} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formClusterName} />
                      }
                      fullWidth
                      value={userQuota.get('clusterName')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formNamespace} />
                      }
                      fullWidth
                      value={userQuota.get('namespace')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formCPU} />}
                      fullWidth
                      inputProps={{
                        endAdornment: (
                          <FormattedMessage {...messages.formCPUEndAdornment} />
                        ),
                      }}
                      value={userQuota.get('cpu')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formMemory} />}
                      fullWidth
                      inputProps={{
                        endAdornment: (reg.exec(memory) || [])[2],
                      }}
                      value={(reg.exec(memory) || [])[1]}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formStorage} />}
                      fullWidth
                      inputProps={{
                        endAdornment: (reg.exec(storage) || [])[2],
                      }}
                      value={(reg.exec(storage) || [])[1]}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
                    <ReadOnlyTextarea
                      name="purpose"
                      label={<FormattedMessage {...messages.formPurpose} />}
                      formControlProps={{
                        className: classes.textareaControl,
                      }}
                      inputProps={{
                        type: 'text',
                        autoComplete: 'off',
                        rows: '4',
                      }}
                      value={userQuota.get('purpose')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
                    <ReadOnlyTextarea
                      name="purpose"
                      label={
                        <FormattedMessage {...messages.formRejectionReason} />
                      }
                      formControlProps={{
                        className: classes.textareaControl,
                      }}
                      inputProps={{
                        type: 'text',
                        autoComplete: 'off',
                        rows: '4',
                      }}
                      value={userQuota.get('rejectionReason')}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userQuota: makeSelectCurrent(),
  url: makeSelectURL(),
  userQuotaID: makeSelectCurrentID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserQuotaDetailPage);
