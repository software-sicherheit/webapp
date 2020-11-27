export default {
  setStatistics(state, payload) {
    state.cpuUsage = payload.cpuUsage;
    state.ramUsage = payload.ramUsage;
    state.diskUsage = payload.diskUsage;
    state.swapUsage = payload.swapUsage;
    state.inboundTraffic = payload.inboundTraffic;
    state.outboundTraffic = payload.outboundTraffic;
  }
};
