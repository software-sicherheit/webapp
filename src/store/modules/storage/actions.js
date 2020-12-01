import {
  encryptWithDataNameKey,
  decryptWithDataNameKey
} from '../../../api/wca/index.js';

const BASE_URL = 'http://localhost:8085/api/v1';

export default {
  async fetchDocuments(context) {
    console.log('Requesting to fetch all documents from middleware');
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/documents`, {
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
    context.commit('setAllDocument', responseData);
  },
  async upload(context, payload) {
    console.log('Requesting to upload new document');
    console.log('Reqeusting to encrypt document');

    const document = payload.document;
    const cryptoKeys = context.rootGetters['user/cryptoKeys'];
    console.log('Reqeusting to encrypt blob');
    console.log(document.blob);
    const blob = await encryptWithDataNameKey(
      document.blob,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );

    const token = context.rootGetters['auth/token'];
    console.log('Requesting to send document to mw');
    const response = await fetch(`${BASE_URL}/documents/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: document.filename,
        contentType: document.contentType,
        size: blob.length,
        lastModifiedDate: document.lastModifiedDate,
        blob: blob
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

    context.commit('addDocument', { document: document });
  },
  async delete(context, payload) {
    console.log('Requesting to delete document');

    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/documents/${payload.filename}`, {
      method: 'DELETE',
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

    console.log('Response was okay and now removing document from vuex');
    context.commit('removeDocument', payload);
  },
  async downloadDocument(context, payload) {
    console.log('Requesting to download document');

    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/documents/${payload.filename}`, {
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

    const cryptoKeys = context.rootGetters['user/cryptoKeys'];
    console.log('Reqeusting to decrypt blob');
    const blob = await decryptWithDataNameKey(
      responseData.blob,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );
    responseData.blob = blob;

    console.log(
      'Response was okay and now setting downloaded document to vuex'
    );
    context.commit('setDownloadedDocument', responseData);
  }
};
