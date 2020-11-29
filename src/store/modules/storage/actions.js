import {
  encryptDocument,
  encryptWithDataNameKey
} from '../../../api/wca/index.js';

const BASE_URL = 'http://localhost:8080/api/v1';

export default {
  async fetchDocuments(context) {
    console.log('Requesting to fetch all documents from middleware');
    const response = await fetch(`${BASE_URL}/documents.json`, {
      method: 'GET'
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }
    console.log('Response was okay.');

    console.log(responseData);

    const documents = [
      {
        id: 0,
        filename: 'dummy0.json',
        contentType: 'application/json',
        size: 42,
        lastModifiedDate: new Date(),
        blob: new Blob(['Hello World!'])
      }
    ];

    context.commit('setAllDocument', documents);
  },
  async upload(context, payload) {
    console.log('Requesting to upload new document');
    console.log('Reqeusting to encrypt document');

    const document = payload.document;
    const cryptoKeys = context.rootGetters['user/cryptoKeys'];

    const filename = await encryptWithDataNameKey(
      document.filename,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );
    const contentType = await encryptWithDataNameKey(
      document.contentType,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );
    const size = await encryptWithDataNameKey(
      document.size,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );
    const lastModifiedDate = await encryptWithDataNameKey(
      document.lastModifiedDate,
      cryptoKeys.dataNameKey.key,
      cryptoKeys.dataNameKey.iv
    );
    const blob = await encryptDocument(
      document.blob,
      cryptoKeys.rsaPSS.privateKey,
      cryptoKeys.rsaOAEP.publicKey
    );

    const token = context.rootGetters['auth/token'];
    const response = await fetch(`${BASE_URL}/documents.json`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: filename,
        contentType: contentType,
        size: size,
        lastModifiedDate: lastModifiedDate,
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

    const response = await fetch(
      `${BASE_URL}/documents/${payload.documentId}.json`,
      {
        method: 'DELETE'
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      console.log('Response was not ok.');
      throw new Error(
        responseData.messsage || 'Failed to communicate with database.'
      );
    }

    console.log('Response was okay and now removing document from vuex');
    context.commit('removeDocument', payload);
  }
};
