/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable.js';
import { reducer as formReducer } from 'redux-form/immutable.js';

import history from './utils/history.js';
import languageProviderReducer from './containers/LanguageProvider/reducer.js';

// import reducers start
import appReducer from '../app/ducks/app';
import roleReducer, { prefix as rolePrefix } from '../app/ducks/role';
import usersReducer, { prefix as usersPrefix } from '../app/ducks/users';
import secretsReducer, { prefix as secretsPrefix } from '../app/ducks/secrets';
import cronJobsReducer, { prefix as cronJobsPrefix } from '../app/ducks/cronJobs';
import jobsReducer, { prefix as jobsPrefix } from '../app/ducks/jobs';
import podsReducer, { prefix as podsPrefix } from '../app/ducks/pods';
import podNetworksReducer, {
  prefix as podNetworksPrefix,
} from '../app/ducks/podNetworks';
import serviceNetworksReducer, {
  prefix as serviceNetworksPrefix,
} from '../app/ducks/serviceNetworks';
import nodeNetworksReducer, {
  prefix as nodeNetworksPrefix,
} from '../app/ducks/nodeNetworks';
import namespacesReducer, {
  prefix as namespacesPrefix,
} from '../app/ducks/namespaces';
import resourceQuotasReducer, {
  prefix as resourceQuotasPrefix,
} from '../app/ducks/resourceQuotas';
import nodesReducer, { prefix as nodesPrefix } from '../app/ducks/nodes';
import clustersReducer, { prefix as clustersPrefix } from '../app/ducks/clusters';
import eventsReducer, { prefix as eventsPrefix } from '../app/ducks/events';
import userQuotasReducer, {
  prefix as userQuotasPrefix,
} from '../app/ducks/userQuotas';
import servicesReducer, { prefix as servicesPrefix } from '../app/ducks/services';
import deploymentsReducer, {
  prefix as deploymentsPrefix,
} from '../app/ducks/deployments';
import horizontalPodAutoscalersReducer, {
  prefix as horizontalPodAutoscalersPrefix,
} from '../app/ducks/horizontalPodAutoscalers';
import metricsReducer, { prefix as metricsPrefix } from '../app/ducks/metrics';
import statefulSetsReducer, {
  prefix as statefulSetsPrefix,
} from '../app/ducks/statefulSets';
import daemonSetsReducer, {
  prefix as daemonSetsPrefix,
} from '../app/ducks/daemonSets';
import ingressesReducer, { prefix as ingressesPrefix } from '../app/ducks/ingresses';
import udpIngressesReducer, {
  prefix as udpIngressesPrefix,
} from '../app/ducks/udpIngresses';
import applicationsReducer, {
  prefix as applicationsPrefix,
} from '../app/ducks/applications';
import registriesReducer, {
  prefix as registriesPrefix,
} from '../app/ducks/registries';
import monitorsReducer, { prefix as monitorsPrefix } from '../app/ducks/monitors';
import efksReducer, { prefix as efksPrefix } from '../app/ducks/efks';
import chartsReducer, { prefix as chartsPrefix } from '../app/ducks/charts';
import configMapsReducer, {
  prefix as configMapsPrefix,
} from '../app/ducks/configMaps';
import storagesReducer, {
  prefix as storagesPrefix,
} from '../app/ducks/storages';
import storageClassesReducer, {
  prefix as storageClassesPrefix,
} from '../app/ducks/storageClasses';
import blockDevicesReducer, {
  prefix as blockDevicesPrefix,
} from '../app/ducks/blockDevices';
import innerServicesReducer, {
  prefix as innerServicesPrefix,
} from '../app/ducks/innerServices';
import outerServicesReducer, {
  prefix as outerServicesPrefix,
} from '../app/ducks/outerServices';
import fluentbitconfigsReducer, {
  prefix as fluentbitconfigsPrefix,
} from '../app/ducks/fluentbitconfigs';
import svcMeshWorkloadsReducer, {
  prefix as svcMeshWorkloadsPrefix,
} from '../app/ducks/svcMeshWorkloads';
import svcMeshPodsReducer, {
  prefix as svcMeshPodsPrefix,
} from '../app/ducks/svcMeshPods';
import svcMeshTapReducer, {
  prefix as svcMeshTapPrefix,
} from '../app/ducks/svcMeshTap';
import alarmsReducer, { prefix as alarmsPrefix } from '../app/ducks/alarms';
import thresholdsReducer, {
  prefix as thresholdsPrefix,
} from '../app/ducks/thresholds';
import persistentVolumeClaimsReducer, {
  prefix as persistentVolumeClaimsPrefix,
} from '../app/ducks/persistentVolumeClaims';
import persistentVolumesReducer, {
  prefix as persistentVolumesPrefix,
} from '../app/ducks/persistentVolumes';
import auditLogsReducer, {
  prefix as auditLogsPrefix,
} from '../app/ducks/auditLogs';
import workFlowTasksReducer, {
  prefix as workFlowTasksPrefix,
} from '../app/ducks/workFlowTasks';
import workFlowsReducer, {
  prefix as workFlowsPrefix,
} from '../app/ducks/workFlows';

// import reducers end

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // combine reducers start
    language: languageProviderReducer,
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    [rolePrefix]: roleReducer,
    [usersPrefix]: usersReducer,
    [configMapsPrefix]: configMapsReducer,
    [secretsPrefix]: secretsReducer,
    [horizontalPodAutoscalersPrefix]: horizontalPodAutoscalersReducer,
    [metricsPrefix]: metricsReducer,
    [deploymentsPrefix]: deploymentsReducer,
    [statefulSetsPrefix]: statefulSetsReducer,
    [daemonSetsPrefix]: daemonSetsReducer,
    [cronJobsPrefix]: cronJobsReducer,
    [jobsPrefix]: jobsReducer,
    [podsPrefix]: podsReducer,
    [podNetworksPrefix]: podNetworksReducer,
    [serviceNetworksPrefix]: serviceNetworksReducer,
    [nodeNetworksPrefix]: nodeNetworksReducer,
    [namespacesPrefix]: namespacesReducer,
    [resourceQuotasPrefix]: resourceQuotasReducer,
    [nodesPrefix]: nodesReducer,
    [clustersPrefix]: clustersReducer,
    [eventsPrefix]: eventsReducer,
    [userQuotasPrefix]: userQuotasReducer,
    [servicesPrefix]: servicesReducer,
    [ingressesPrefix]: ingressesReducer,
    [udpIngressesPrefix]: udpIngressesReducer,
    [applicationsPrefix]: applicationsReducer,
    [registriesPrefix]: registriesReducer,
    [monitorsPrefix]: monitorsReducer,
    [efksPrefix]: efksReducer,
    [chartsPrefix]: chartsReducer,
    [storagesPrefix]: storagesReducer,
    [storageClassesPrefix]: storageClassesReducer,
    [blockDevicesPrefix]: blockDevicesReducer,
    [innerServicesPrefix]: innerServicesReducer,
    [outerServicesPrefix]: outerServicesReducer,
    [fluentbitconfigsPrefix]: fluentbitconfigsReducer,
    [svcMeshWorkloadsPrefix]: svcMeshWorkloadsReducer,
    [svcMeshPodsPrefix]: svcMeshPodsReducer,
    [svcMeshTapPrefix]: svcMeshTapReducer,
    [alarmsPrefix]: alarmsReducer,
    [thresholdsPrefix]: thresholdsReducer,
    [persistentVolumeClaimsPrefix]: persistentVolumeClaimsReducer,
    [persistentVolumesPrefix]: persistentVolumesReducer,
    [auditLogsPrefix]: auditLogsReducer,
    [workFlowTasksPrefix]: workFlowTasksReducer,
    [workFlowsPrefix]: workFlowsReducer,
    // combine reducers end
    ...injectedReducers,
  });

  return rootReducer;
}
