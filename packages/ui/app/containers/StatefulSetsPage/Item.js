/*
 *
 * StatefulSet
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import parseCmd from '../../../src/utils/parseCmd.js';

import InputAdornment from '@mui/material/InputAdornment';
import ButtonBase from '@mui/material/ButtonBase';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import ReadOnlyInput from '../../components/CustomInput/ReadOnlyInput.js';
import ReadOnlyCheckbox from '../../components/CustomCheckbox/ReadOnlyCheckbox.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import * as cActions from '../../ducks/configMaps/actions.js';
import * as actions from '../../ducks/statefulSets/actions.js';
import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import { makeSelectConfigMaps } from '../../ducks/configMaps/selectors.js';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const StatefulSet = ({
  executeStatefulSetAction,
  statefulSet,
  clusterID,
  namespaceID,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const replicas = statefulSet.get('replicas');
  const id = statefulSet.get('id');
  const selfUrl = statefulSet.getIn(['links', 'self']);
  const typeMap = {
    configmap: intl.formatMessage(messages.formVolumeTypeConfigMap),
    secret: intl.formatMessage(messages.formVolumeTypeSecret),
    persistentVolume: intl.formatMessage(
      messages.formVolumeTypePersistentVolume
    ),
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.statefulSetDetail} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    value={statefulSet.get('name')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formReplicas} />}
                    name="replicas"
                    fullWidth
                    value={statefulSet.get('replicas')}
                    inputProps={{
                      type: 'number',
                      autoComplete: 'off',
                      endAdornment: (
                        <InputAdornment position="end">
                          <ButtonBase
                            disabled={replicas === 1}
                            onClick={(evt) => {
                              executeStatefulSetAction(
                                'setPodCount',
                                {
                                  replicas: replicas - 1,
                                },
                                {
                                  url: selfUrl,
                                  statefulSet,
                                  clusterID,
                                  namespaceID,
                                  id,
                                  patch: true,
                                }
                              );
                            }}
                          >
                            <RemoveIcon />
                          </ButtonBase>
                          <ButtonBase
                            disabled={replicas >= 50}
                            onClick={(evt) => {
                              executeStatefulSetAction(
                                'setPodCount',
                                {
                                  replicas: replicas + 1,
                                },
                                {
                                  url: selfUrl,
                                  statefulSet,
                                  clusterID,
                                  namespaceID,
                                  id,
                                  patch: true,
                                }
                              );
                            }}
                          >
                            <AddIcon />
                          </ButtonBase>
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formContainers} />
            </h4>
          </CardHeader>
          <CardBody>
            <List component="ul" className={classes.noPaddingList}>
              {statefulSet &&
                statefulSet.get('containers') &&
                statefulSet.get('containers').map((c, i) => (
                  <Card key={i}>
                    <CardBody>
                      <ListItem key={i}>
                        <ListItemText>
                          <GridContainer>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage
                                    {...messages.formContainerName}
                                  />
                                }
                                fullWidth
                                value={c.get('name')}
                              />
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formImage} />
                                }
                                fullWidth
                                value={c.get('image')}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formCommand} />
                                }
                                fullWidth
                                value={parseCmd(c.get('command'))}
                              />
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formArgs} />
                                }
                                fullWidth
                                value={parseCmd(c.get('args'))}
                              />
                            </GridItem>
                          </GridContainer>
                          {c.get('env') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formENV}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('env').map((p, j) => (
                                    <ListItem key={j}>
                                      <ListItemText>
                                        <GridContainer>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formENVName}
                                                />
                                              }
                                              value={p.get('name')}
                                            />
                                          </GridItem>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formENVValue}
                                                />
                                              }
                                              value={p.get('value')}
                                            />
                                          </GridItem>
                                        </GridContainer>
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                          {c.get('volumes') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formVolumes}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('volumes').map((p, k) => (
                                    <ListItem key={k}>
                                      <ListItemText>
                                        <GridContainer>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formVolumeType}
                                                />
                                              }
                                              value={typeMap[p.get('type')]}
                                            />
                                          </GridItem>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formVolumeName}
                                                />
                                              }
                                              value={p.get('name')}
                                            />
                                          </GridItem>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formMountPath}
                                                />
                                              }
                                              value={p.get('mountPath')}
                                            />
                                          </GridItem>
                                        </GridContainer>
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                          {c.get('exposedPorts') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formExposedPorts}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('exposedPorts').map((p, l) => (
                                    <ListItem key={l}>
                                      <ListItemText>
                                        <GridContainer>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formPortName}
                                                />
                                              }
                                              value={p.get('name')}
                                            />
                                          </GridItem>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formPortProtocol}
                                                />
                                              }
                                              value={p.get('protocol')}
                                            />
                                          </GridItem>
                                          <GridItem
                                            xs={3}
                                            sm={3}
                                            md={3}
                                            className={classes.formLine}
                                          >
                                            <ReadOnlyInput
                                              labelText={
                                                <FormattedMessage
                                                  {...messages.formPort}
                                                />
                                              }
                                              value={p.get('port')}
                                            />
                                          </GridItem>
                                        </GridContainer>
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                        </ListItemText>
                      </ListItem>
                    </CardBody>
                  </Card>
                ))}
            </List>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formServiceConfig} />
            </h4>
          </CardHeader>
          <CardBody>
            {statefulSet.get('advancedOptions') ? (
              <Fragment>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyCheckbox
                      labelText={
                        <FormattedMessage
                          {...messages.formReloadWhenConfigChange}
                        />
                      }
                      value={statefulSet.getIn([
                        'advancedOptions',
                        'reloadWhenConfigChange',
                      ])}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyCheckbox
                      labelText={
                        <FormattedMessage {...messages.formInjectServiceMesh} />
                      }
                      value={statefulSet.getIn([
                        'advancedOptions',
                        'injectServiceMesh',
                      ])}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formExposedMetricPath} />
                      }
                      value={statefulSet.getIn([
                        'advancedOptions',
                        'exposedMetric',
                        'path',
                      ])}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formExposedMeticPort} />
                      }
                      value={statefulSet.getIn([
                        'advancedOptions',
                        'exposedMetric',
                        'port',
                      ])}
                    />
                  </GridItem>
                </GridContainer>
              </Fragment>
            ) : null}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formVolumeClaimTemplate} />
            </h4>
          </CardHeader>
          <CardBody>
            {statefulSet.get('persistentVolumes') &&
              statefulSet.get('persistentVolumes').map((pv) => (
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formVolumeClaimTemplateName}
                        />
                      }
                      value={pv.get('name')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formVolumeClaimTemplateSize}
                        />
                      }
                      value={pv.get('size')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formVolumeClaimTemplateStorageClassName}
                        />
                      }
                      value={pv.get('storageClassName')}
                    />
                  </GridItem>
                </GridContainer>
              ))}
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  configMaps: makeSelectConfigMaps(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(StatefulSet);
