export default {
  setSaltPasswordKey(state, payload) {
    state.passwordKey.salt = payload.saltPasswordKey;
  },
  setRSAOAEP(state, payload) {
    state.rsaOAEP.iv = payload.iv;
    state.rsaOAEP.publicKey = payload.publicKey;
    state.rsaOAEP.privateKey = payload.privateKey;
  },
  setRSAPSS(state, payload) {
    state.rsaPSS.iv = payload.iv;
    state.rsaPSS.publicKey = payload.publicKey;
    state.rsaPSS.privateKey = payload.privateKey;
  },
  setDataNameKey(state, payload) {
    state.dataNameKey.iv = payload.iv;
    state.dataNameKey.key = payload.key;
  },
  removeKeySet(state) {
    state.passwordKey.salt = null;
    state.rsaOAEP.iv = null;
    state.rsaOAEP.publicKey = null;
    state.rsaOAEP.privateKey = null;
    state.rsaPSS.iv = null;
    state.rsaPSS.publicKey = null;
    state.rsaPSS.privateKey = null;
    state.dataNameKey.iv = null;
    state.dataNameKey.key = null;
  }
};
