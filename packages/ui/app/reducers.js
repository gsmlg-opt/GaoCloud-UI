/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import history from './utils/history.js';
import languageProviderReducer from './containers/LanguageProvider/reducer.js';

// import reducers start
import appReducer from 'ducks/app/index.js';
import roleReducer, { prefix as rolePrefix } from 'ducks/role/index.js';
import usersReducer, { prefix as usersPrefix } from 'ducks/users/index.js';
import secretsReducer, { prefix as secretsPrefix } from 'ducks/secrets/index.js';
import cronJobsReducer, { prefix as cronJobsPrefix } from 'ducks/cronJobs/index.js';
import jobsReducer, { prefix as jobsPrefix } from 'ducks/jobs/index.js';
import podsReducer, { prefix as podsPrefix } from 'ducks/pods/index.js';
import podNetworksReducer, {
  prefix as podNetworksPrefix,
} from 'ducks/podNetworks/index.js';
import serviceNetworksReducer, {
  prefix as serviceNetworksPrefix,
} from 'ducks/serviceNetworks/index.js';
import nodeNetworksReducer, {
  prefix as nodeNetworksPrefix,
} from 'ducks/nodeNetworks/index.js';
import namespacesReducer, {
  prefix as namespacesPrefix,
} from 'ducks/namespaces/index.js';
import resourceQuotasReducer, {
  prefix as resourceQuotasPrefix,
} from 'ducks/resourceQuotas/index.js';
import nodesReducer, { prefix as nodesPrefix } from 'ducks/nodes/index.js';
import clustersReducer, { prefix as clustersPrefix } from 'ducks/clusters/index.js';
import eventsReducer, { prefix as eventsPrefix } from 'ducks/events/index.js';
import userQuotasReducer, {
  prefix as userQuotasPrefix,
} from 'ducks/userQuotas/index.js';
import servicesReducer, { prefix as servicesPrefix } from 'ducks/services/index.js';
import deploymentsReducer, {
  prefix as deploymentsPrefix,
} from 'ducks/deployments/index.js';
import horizontalPodAutoscalersReducer, {
  prefix as horizontalPodAutoscalersPrefix,
} from 'ducks/horizontalPodAutoscalers/index.js';
import metricsReducer, { prefix as metricsPrefix } from 'ducks/metrics/index.js';
import statefulSetsReducer, {
  prefix as statefulSetsPrefix,
} from 'ducks/statefulSets/index.js';
import daemonSetsReducer, {
  prefix as daemonSetsPrefix,
} from 'ducks/daemonSets/index.js';
import ingressesReducer, { prefix as ingressesPrefix } from 'ducks/ingresses/index.js';
import udpIngressesReducer, {
  prefix as udpIngressesPrefix,
} from 'ducks/udpIngresses/index.js';
import applicationsReducer, {
  prefix as applicationsPrefix,
} from 'ducks/applications/index.js';
import registriesReducer, {
  prefix as registriesPrefix,
} from 'ducks/registries/index.js';
import monitorsReducer, { prefix as monitorsPrefix } from 'ducks/monitors/index.js';
import efksReducer, { prefix as efksPrefix } from 'ducks/efks/index.js';
import chartsReducer, { prefix as chartsPrefix } from 'ducks/charts/index.js';
import configMapsReducer, {
  prefix as configMapsPrefix,
} from 'ducks/configMaps/index.js';
import storagesReducer, {
  prefix as storagesPrefix,
} from 'ducks/storages/index.js';
import storageClassesReducer, {
  prefix as storageClassesPrefix,
} from 'ducks/storageClasses/index.js';
import blockDevicesReducer, {
  prefix as blockDevicesPrefix,
} from 'ducks/blockDevices/index.js';
import innerServicesReducer, {
  prefix as innerServicesPrefix,
} from 'ducks/innerServices/index.js';
import outerServicesReducer, {
  prefix as outerServicesPrefix,
} from 'ducks/outerServices/index.js';
import fluentbitconfigsReducer, {
  prefix as fluentbitconfigsPrefix,
} from 'ducks/fluentbitconfigs/index.js';
import svcMeshWorkloadsReducer, {
  prefix as svcMeshWorkloadsPrefix,
} from 'ducks/svcMeshWorkloads/index.js';
import svcMeshPodsReducer, {
  prefix as svcMeshPodsPrefix,
} from 'ducks/svcMeshPods/index.js';
import svcMeshTapReducer, {
  prefix as svcMeshTapPrefix,
} from 'ducks/svcMeshTap/index.js';
import alarmsReducer, { prefix as alarmsPrefix } from 'ducks/alarms/index.js';
import thresholdsReducer, {
  prefix as thresholdsPrefix,
} from 'ducks/thresholds/index.js';
import persistentVolumeClaimsReducer, {
  prefix as persistentVolumeClaimsPrefix,
} from 'ducks/persistentVolumeClaims/index.js';
import persistentVolumesReducer, {
  prefix as persistentVolumesPrefix,
} from 'ducks/persistentVolumes/index.js';
import auditLogsReducer, {
  prefix as auditLogsPrefix,
} from 'ducks/auditLogs/index.js';
import workFlowTasksReducer, {
  prefix as workFlowTasksPrefix,
} from 'ducks/workFlowTasks/index.js';
import workFlowsReducer, {
  prefix as workFlowsPrefix,
} from 'ducks/workFlows/index.js';

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
