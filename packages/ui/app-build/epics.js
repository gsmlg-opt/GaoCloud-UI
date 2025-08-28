/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineEpics } from 'redux-observable';

// import epics start
import appEpic from '../app/ducks/app/epic';
import eventsEpic from '../app/ducks/events/epic';
import roleEpic from '../app/ducks/role/epic';
import usersEpic from '../app/ducks/users/epic';
import namespacesEpic from '../app/ducks/namespaces/epic';
import nodesEpic from '../app/ducks/nodes/epic';
import configMapsEpic from '../app/ducks/configMaps/epic';
import secretsEpic from '../app/ducks/secrets/epic';
import horizontalPodAutoscalersEpic from '../app/ducks/horizontalPodAutoscalers/epic';
import metricsEpic from '../app/ducks/metrics/epic';
import deploymentsEpic from '../app/ducks/deployments/epic';
import statefulSetsEpic from '../app/ducks/statefulSets/epic';
import daemonSetsEpic from '../app/ducks/daemonSets/epic';
import cronJobsEpic from '../app/ducks/cronJobs/epic';
import jobsEpic from '../app/ducks/jobs/epic';
import podsEpic from '../app/ducks/pods/epic';
import podNetworksEpic from '../app/ducks/podNetworks/epic';
import serviceNetworksEpic from '../app/ducks/serviceNetworks/epic';
import nodeNetworksEpic from '../app/ducks/nodeNetworks/epic';
import clustersEpic from '../app/ducks/clusters/epic';
import resourceQuotasEpic from '../app/ducks/resourceQuotas/epic';
import userQuotasEpic from '../app/ducks/userQuotas/epic';
import servicesEpic from '../app/ducks/services/epic';
import ingressesEpic from '../app/ducks/ingresses/epic';
import udpIngressesEpic from '../app/ducks/udpIngresses/epic';
import applicationsEpic from '../app/ducks/applications/epic';
import registriesEpic from '../app/ducks/registries/epic';
import monitorsEpic from '../app/ducks/monitors/epic';
import efksEpic from '../app/ducks/efks/epic';
import chartsEpic from '../app/ducks/charts/epic';
import storagesEpic from '../app/ducks/storages/epic';
import storageClassesEpic from '../app/ducks/storageClasses/epic';
import blockDevicesEpic from '../app/ducks/blockDevices/epic';
import innerServicesEpic from '../app/ducks/innerServices/epic';
import outerServicesEpic from '../app/ducks/outerServices/epic';
import fluentbitconfigsEpic from '../app/ducks/fluentbitconfigs/epic';
import alarmsEpic from '../app/ducks/alarms/epic';
import thresholdsEpic from '../app/ducks/thresholds/epic';
import persistentVolumeClaimsEpic from '../app/ducks/persistentVolumeClaims/epic';
import persistentVolumesEpic from '../app/ducks/persistentVolumes/epic';
import auditLogsEpic from '../app/ducks/auditLogs/epic';
import workFlowsEpic from '../app/ducks/workFlows/epic';
import workFlowTasksEpic from '../app/ducks/workFlowTasks/epic';

import svcMeshWorkloadsEpic from '../app/ducks/svcMeshWorkloads/epic';
import svcMeshPodsEpic from '../app/ducks/svcMeshPods/epic';
import svcMeshTapEpic from '../app/ducks/svcMeshTap/epic';

// import epics end

/**
 * Create root Epic
 */
export default function createEpic(injectedEpics = {}) {
  const rootEpic = combineEpics(
    // combine epics start
    appEpic,
    clustersEpic,
    eventsEpic,
    roleEpic,
    usersEpic,
    userQuotasEpic,
    namespacesEpic,
    nodesEpic,
    configMapsEpic,
    secretsEpic,
    horizontalPodAutoscalersEpic,
    metricsEpic,
    deploymentsEpic,
    statefulSetsEpic,
    daemonSetsEpic,
    cronJobsEpic,
    jobsEpic,
    podsEpic,
    podNetworksEpic,
    serviceNetworksEpic,
    nodeNetworksEpic,
    resourceQuotasEpic,
    servicesEpic,
    ingressesEpic,
    udpIngressesEpic,
    applicationsEpic,
    registriesEpic,
    monitorsEpic,
    efksEpic,
    chartsEpic,
    storagesEpic,
    storageClassesEpic,
    blockDevicesEpic,
    innerServicesEpic,
    outerServicesEpic,
    fluentbitconfigsEpic,
    svcMeshWorkloadsEpic,
    svcMeshPodsEpic,
    svcMeshTapEpic,
    alarmsEpic,
    thresholdsEpic,
    persistentVolumeClaimsEpic,
    persistentVolumesEpic,
    auditLogsEpic,
    workFlowTasksEpic,
    workFlowsEpic
    // combine epics end
  );

  return rootEpic;
}
