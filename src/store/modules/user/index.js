import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      passwordKey: {
        salt: null
      },
      rsaOAEP: {
        iv: null,
        publicKey: null,
        privateKey: null
      },
      rsaPSS: {
        iv: null,
        publicKey: null,
        privateKey: null
      },
      dataNameKey: {
        iv: null,
        key: null
      }
    };
  },
  mutations,
  actions,
  getters
};
