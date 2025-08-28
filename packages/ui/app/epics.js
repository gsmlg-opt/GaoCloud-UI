/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineEpics } from 'redux-observable';

// import epics start
import appEpic from 'ducks/app/epic.js';
import eventsEpic from 'ducks/events/epic.js';
import roleEpic from 'ducks/role/epic.js';
import usersEpic from 'ducks/users/epic.js';
import namespacesEpic from 'ducks/namespaces/epic.js';
import nodesEpic from 'ducks/nodes/epic.js';
import configMapsEpic from 'ducks/configMaps/epic.js';
import secretsEpic from 'ducks/secrets/epic.js';
import horizontalPodAutoscalersEpic from 'ducks/horizontalPodAutoscalers/epic.js';
import metricsEpic from 'ducks/metrics/epic.js';
import deploymentsEpic from 'ducks/deployments/epic.js';
import statefulSetsEpic from 'ducks/statefulSets/epic.js';
import daemonSetsEpic from 'ducks/daemonSets/epic.js';
import cronJobsEpic from 'ducks/cronJobs/epic.js';
import jobsEpic from 'ducks/jobs/epic.js';
import podsEpic from 'ducks/pods/epic.js';
import podNetworksEpic from 'ducks/podNetworks/epic.js';
import serviceNetworksEpic from 'ducks/serviceNetworks/epic.js';
import nodeNetworksEpic from 'ducks/nodeNetworks/epic.js';
import clustersEpic from 'ducks/clusters/epic.js';
import resourceQuotasEpic from 'ducks/resourceQuotas/epic.js';
import userQuotasEpic from 'ducks/userQuotas/epic.js';
import servicesEpic from 'ducks/services/epic.js';
import ingressesEpic from 'ducks/ingresses/epic.js';
import udpIngressesEpic from 'ducks/udpIngresses/epic.js';
import applicationsEpic from 'ducks/applications/epic.js';
import registriesEpic from 'ducks/registries/epic.js';
import monitorsEpic from 'ducks/monitors/epic.js';
import efksEpic from 'ducks/efks/epic.js';
import chartsEpic from 'ducks/charts/epic.js';
import storagesEpic from 'ducks/storages/epic.js';
import storageClassesEpic from 'ducks/storageClasses/epic.js';
import blockDevicesEpic from 'ducks/blockDevices/epic.js';
import innerServicesEpic from 'ducks/innerServices/epic.js';
import outerServicesEpic from 'ducks/outerServices/epic.js';
import fluentbitconfigsEpic from 'ducks/fluentbitconfigs/epic.js';
import alarmsEpic from 'ducks/alarms/epic.js';
import thresholdsEpic from 'ducks/thresholds/epic.js';
import persistentVolumeClaimsEpic from 'ducks/persistentVolumeClaims/epic.js';
import persistentVolumesEpic from 'ducks/persistentVolumes/epic.js';
import auditLogsEpic from 'ducks/auditLogs/epic.js';
import workFlowsEpic from 'ducks/workFlows/epic.js';
import workFlowTasksEpic from 'ducks/workFlowTasks/epic.js';

import svcMeshWorkloadsEpic from 'ducks/svcMeshWorkloads/epic.js';
import svcMeshPodsEpic from 'ducks/svcMeshPods/epic.js';
import svcMeshTapEpic from 'ducks/svcMeshTap/epic.js';

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
