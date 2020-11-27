import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      cpuUsage: null,
      ramUsage: null,
      diskUsage: null,
      swapUsage: null,
      inboundTraffic: null,
      outboundTraffic: null
    };
  },
  mutations,
  actions,
  getters
};
