import {
  addPublicHeaderFooter,
  addPrivateHeaderFooter
} from '../../../api/wca/pemManagement.js';
import {
  createFingerprint,
  exportToPrivatePEM,
  exportToPublicPEM
} from '../../../api/wca/index.js';

export default {
  async rsaOaepPrivateKey(state) {
    const cryptoKey = state.rsaOAEP.privateKey;
    const exportCryptoKey = await exportToPrivatePEM(cryptoKey);
    return addPrivateHeaderFooter(exportCryptoKey);
  },
  async rsaOaepPrivateKeyFingerprint(state) {
    const cryptoKey = state.rsaOAEP.privateKey;
    const exportCryptoKey = await exportToPrivatePEM(cryptoKey);
    return await createFingerprint(exportCryptoKey);
  },
  async rsaOaepPublicKey(state) {
    const cryptoKey = state.rsaOAEP.publicKey;
    const exportCryptoKey = exportToPublicPEM(cryptoKey);
    return addPublicHeaderFooter(exportCryptoKey);
  },
  async rsaOaepPublicKeyFingerprint(state) {
    const cryptoKey = state.rsaOAEP.publicKey;
    const exportCryptoKey = await exportToPublicPEM(cryptoKey);
    return await createFingerprint(exportCryptoKey);
  },
  async rsaPssPrivateKey(state) {
    const cryptoKey = state.rsaPSS.privateKey;
    const exportCryptoKey = await exportToPrivatePEM(cryptoKey);
    return addPrivateHeaderFooter(exportCryptoKey);
  },
  async rsaPssPrivateKeyFingerprint(state) {
    const cryptoKey = state.rsaPSS.privateKey;
    const exportCryptoKey = await exportToPrivatePEM(cryptoKey);
    return await createFingerprint(exportCryptoKey);
  },
  async rsaPssPublicKey(state) {
    const cryptoKey = state.rsaPSS.publicKey;
    const exportCryptoKey = await exportToPublicPEM(cryptoKey);
    return addPublicHeaderFooter(exportCryptoKey);
  },
  async rsaPssPublicKeyFingerprint(state) {
    const cryptoKey = state.rsaPSS.publicKey;
    const exportCryptoKey = await exportToPublicPEM(cryptoKey);
    return await createFingerprint(exportCryptoKey);
  },
  cryptoKeys(state) {
    return state;
  }
};
