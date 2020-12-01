import {
  newPBKDF2Salt,
  derivePasswordKey,
  newIV,
  generateRSAOAEPKeyPair,
  generateRSAPSSKeyPair,
  generateDataNameKey,
  encryptPrivateKey,
  importRSAOAEPPrivateKey,
  importRSAOAEPPublicKey,
  importRSAPSSPrivateKey,
  importRSAPSSPublicKey,
  importDataNameKey,
  exportToPublicPEM,
  encryptDataNameKey
} from '../../../api/wca/index.js';
import store from '../../index.js';

const BASE_URL = 'https://10.28.55.157/api/v1';

export default {
  async registerUser(context, payload) {
    console.log('Requesting to setup crypto keys');

    const saltPasswordKey = await newPBKDF2Salt(32);
    const passwordKey = await derivePasswordKey(
      payload.password,
      saltPasswordKey
    );
    context.commit('setSaltPasswordKey', {
      saltPasswordKey: saltPasswordKey
    });

    const ivRSAOAEP = await newIV();
    const rsaOAEPKeyPair = await generateRSAOAEPKeyPair();
    context.commit('setRSAOAEP', {
      iv: ivRSAOAEP,
      publicKey: rsaOAEPKeyPair.publicKey,
      privateKey: rsaOAEPKeyPair.privateKey
    });

    const ivRSAPSS = await newIV();
    const rsaPSSKeyPair = await generateRSAPSSKeyPair();
    context.commit('setRSAPSS', {
      iv: ivRSAPSS,
      publicKey: rsaPSSKeyPair.publicKey,
      privateKey: rsaPSSKeyPair.privateKey
    });

    const ivDataNameKey = await newIV();
    const dataNameKey = await generateDataNameKey(rsaOAEPKeyPair.publicKey);
    context.commit('setDataNameKey', {
      iv: ivDataNameKey,
      key: dataNameKey
    });

    console.log('Successfully got new crypto keys.');

    const privateRSAOAEPKey = await encryptPrivateKey(
      passwordKey,
      ivRSAOAEP,
      rsaOAEPKeyPair.privateKey
    );
    const privateRSAPSSKey = await encryptPrivateKey(
      passwordKey,
      ivRSAPSS,
      rsaPSSKeyPair.privateKey
    );
    const publicRSAOAEPKey = await exportToPublicPEM(rsaOAEPKeyPair.publicKey);
    const publicRSAPSSKey = await exportToPublicPEM(rsaPSSKeyPair.publicKey);

    console.log('Requesting to post new crypto keys to middleware');

    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        passwordKey: {
          salt: saltPasswordKey
        },
        rsaOAEP: {
          iv: ivRSAOAEP,
          publicKey: publicRSAOAEPKey,
          privateKey: privateRSAOAEPKey
        },
        rsaPSS: {
          iv: ivRSAPSS,
          publicKey: publicRSAPSSKey,
          privateKey: privateRSAPSSKey
        },
        dataNameKey: {
          iv: ivDataNameKey,
          key: dataNameKey
        }
      })
    });

    if (!response.ok) {
      console.log('Response was not ok.');
      const responseData = await response.json();
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log('Response was okay');
  },
  async loginUser(context, payload) {
    console.log('Requesting to get exisiting crypto keys from middleware');
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log('Response was okay.');

    const passwordKey = await derivePasswordKey(
      payload.password,
      responseData.passwordKey.salt
    );
    console.log('Decrypting now private RSA-OAEP key');
    const rsaOAEPPrivateKey = await importRSAOAEPPrivateKey(
      responseData.rsaOAEP.privateKey,
      passwordKey,
      responseData.rsaOAEP.iv
    );
    console.log('Importing now public RSA-OAEP key');
    const rsaOAEPPublicKey = await importRSAOAEPPublicKey(
      responseData.rsaOAEP.publicKey
    );
    console.log('Decrypting now private RSA-PSS key');
    const rsaPSSPrivateKey = await importRSAPSSPrivateKey(
      responseData.rsaPSS.privateKey,
      passwordKey,
      responseData.rsaPSS.iv
    );
    console.log('Importing now public RSA-OPSS key');
    const rsaPSSPublicKey = await importRSAPSSPublicKey(
      responseData.rsaPSS.publicKey
    );
    console.log('Decrypting now dataNameKey');
    const dataNameKey = await importDataNameKey(
      responseData.dataNameKey.key,
      rsaOAEPPrivateKey
    );

    console.log('Now commiting crypto keys to vuex');
    context.commit('setSaltPasswordKey', {
      saltPasswordKey: responseData.passwordKey.salt
    });
    context.commit('setRSAOAEP', {
      iv: responseData.rsaOAEP.iv,
      publicKey: rsaOAEPPublicKey,
      privateKey: rsaOAEPPrivateKey
    });
    context.commit('setRSAPSS', {
      iv: responseData.rsaPSS.iv,
      publicKey: rsaPSSPublicKey,
      privateKey: rsaPSSPrivateKey
    });
    context.commit('setDataNameKey', {
      iv: responseData.dataNameKey.iv,
      key: dataNameKey
    });
  },
  async deleteAccount(context) {
    console.log('Requesting to delete account.');

    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.log('Response was not ok.');
      const responseData = await response.json();
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }

    console.log('Response was okay and now removing all crypto keys from vuex');
    return context.commit('removeKeySet');
  },
  async changePassword(context, payload) {
    console.log(
      'Requesting to change password and trying to change crypto keys.'
    );

    const cryptoKeys = context.getters['cryptoKeys'];
    const passwordKey = await derivePasswordKey(
      payload.password,
      cryptoKeys.passwordKey.salt
    );
    const privateRSAOAEPKey = await encryptPrivateKey(
      passwordKey,
      cryptoKeys.rsaOAEP.iv,
      cryptoKeys.rsaOAEP.privateKey
    );
    const privateRSAPSSKey = await encryptPrivateKey(
      passwordKey,
      cryptoKeys.rsaPSS.iv,
      cryptoKeys.rsaPSS.privateKey
    );
    const publicRSAOAEPKey = await exportToPublicPEM(
      cryptoKeys.rsaOAEP.publicKey
    );
    const publicRSAPSSKey = await exportToPublicPEM(
      cryptoKeys.rsaPSS.publicKey
    );

    const dataNameKey = await encryptDataNameKey(
      cryptoKeys.rsaOAEP.publicKey,
      cryptoKeys.dataNameKey.key
    );

    console.log('Successfully got new crypto keys.');

    console.log('Requesting to post new crypto keys to middleware');
    const userId = store.getters['auth/userId'];
    const response = await fetch(`${BASE_URL}/users/${userId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        passwordKey: {
          salt: cryptoKeys.passwordKey.salt
        },
        rsaOAEP: {
          iv: cryptoKeys.rsaOAEP.iv,
          publicKey: publicRSAOAEPKey,
          privateKey: privateRSAOAEPKey
        },
        rsaPSS: {
          iv: cryptoKeys.rsaPSS.iv,
          publicKey: publicRSAPSSKey,
          privateKey: privateRSAPSSKey
        },
        dataNameKey: {
          iv: cryptoKeys.dataNameKey.iv,
          key: dataNameKey
        }
      })
    });

    if (!response.ok) {
      console.log('Response was not ok.');
      const responseData = await response.json();
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log(
      'Response was okay and now commiting updated crypto keys to vuex'
    );

    console.dir(context.state);
  }
};
