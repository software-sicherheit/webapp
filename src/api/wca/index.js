import {
  wca,
  PBKDF2_DERIVE_PASSWORD_HASH_ALGORITHM,
  PBKDF2_DERIVE_PASSWORD_KEY_ALGORITHM,
  AES_CBC_PASSWORD_KEY_GEN_ALGORITHM,
  AES_CBC_PASSWORD_KEY_ALGORITHM,
  RSA_OAEP_GEN_ALGORITHM,
  RSA_OAEP_ALGORITHM,
  RSA_OAEP_IMPORT_ALGORITHM,
  RSA_PSS_GEN_ALGORITHM,
  RSA_PSS_IMPORT_ALGORITHM,
  FINGERPRINT_ALGORITHM,
  RSA_PSS_ALGORITHM
} from './config.js';
import { getSaltPasswordHash } from './constants.js';
import {
  base64StringToArrayBuffer,
  stringToArrayBuffer,
  arrayBufferToBase64,
  blobToArrayBuffer
} from './utils.js';
import {
  BEGIN_AES_KEYS_BLOCK,
  END_AES_KEYS_BLOCK,
  BEGIN_IV,
  END_IV,
  BEGIN_BLOB,
  END_BLOB
} from './containerConfig';

export const newIV = () =>
  Promise.resolve(
    window.crypto.getRandomValues(new Uint8Array(16))
  ).then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const getPasswordHash = password =>
  derivePasswordHash(password, getSaltPasswordHash());

export const newPBKDF2Salt = byteSize =>
  Promise.resolve(
    window.crypto.getRandomValues(new Uint8Array(byteSize))
  ).then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const derivePasswordHash = (password, saltPasswordHash) =>
  Promise.resolve(stringToArrayBuffer(password))
    .then(keyMaterial =>
      wca.importKey('raw', keyMaterial, 'PBKDF2', false, ['deriveBits'])
    )
    .then(cryptoKey =>
      wca.deriveBits(
        PBKDF2_DERIVE_PASSWORD_HASH_ALGORITHM(
          base64StringToArrayBuffer(saltPasswordHash)
        ),
        cryptoKey,
        512
      )
    )
    .then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const derivePasswordKey = (password, saltPasswordKey) =>
  Promise.resolve(stringToArrayBuffer(password))
    .then(keyMaterial =>
      wca.importKey('raw', keyMaterial, 'PBKDF2', false, ['deriveKey'])
    )
    .then(cryptoKey =>
      wca.deriveKey(
        PBKDF2_DERIVE_PASSWORD_KEY_ALGORITHM(
          base64StringToArrayBuffer(saltPasswordKey)
        ),
        cryptoKey,
        AES_CBC_PASSWORD_KEY_GEN_ALGORITHM(),
        true,
        ['encrypt', 'decrypt']
      )
    );

export const generateRSAOAEPKeyPair = () =>
  Promise.resolve(
    wca.generateKey(RSA_OAEP_GEN_ALGORITHM(), true, ['encrypt', 'decrypt'])
  );

export const generateRSAPSSKeyPair = () =>
  Promise.resolve(
    wca.generateKey(RSA_PSS_GEN_ALGORITHM(), true, ['sign', 'verify'])
  );

export const generateDataNameKey = cryptoKey =>
  Promise.resolve(
    wca.generateKey(AES_CBC_PASSWORD_KEY_GEN_ALGORITHM(), true, [
      'encrypt',
      'decrypt'
    ])
  ).then(aesCryptoKey => encryptDataNameKey(cryptoKey, aesCryptoKey));

export const encryptDataNameKey = (cryptoKey, aesCryptoKey) =>
  wca
    .exportKey('raw', aesCryptoKey)
    .then(arrayBuffer =>
      wca.encrypt(RSA_OAEP_ALGORITHM(), cryptoKey, arrayBuffer)
    )
    .then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const encryptPrivateKey = (cryptoKey, iv, privateKey) =>
  Promise.resolve(wca.exportKey('pkcs8', privateKey))
    .then(arrayBuffer =>
      wca.encrypt(
        AES_CBC_PASSWORD_KEY_ALGORITHM(base64StringToArrayBuffer(iv)),
        cryptoKey,
        arrayBuffer
      )
    )
    .then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const importRSAOAEPPrivateKey = (key, passwordKey, ivRSAOAEP) =>
  Promise.resolve(base64StringToArrayBuffer(key))
    .then(arrayBuffer =>
      wca.decrypt(
        AES_CBC_PASSWORD_KEY_ALGORITHM(base64StringToArrayBuffer(ivRSAOAEP)),
        passwordKey,
        arrayBuffer
      )
    )
    .then(arrayBuffer =>
      wca.importKey('pkcs8', arrayBuffer, RSA_OAEP_IMPORT_ALGORITHM(), true, [
        'decrypt'
      ])
    );

export const importRSAOAEPPublicKey = key =>
  Promise.resolve(base64StringToArrayBuffer(key)).then(arrayBuffer =>
    wca.importKey('spki', arrayBuffer, RSA_OAEP_IMPORT_ALGORITHM(), true, [
      'encrypt'
    ])
  );

export const importRSAPSSPrivateKey = (key, passwordKey, ivRSAPSS) =>
  Promise.resolve(base64StringToArrayBuffer(key))
    .then(arrayBuffer =>
      wca.decrypt(
        AES_CBC_PASSWORD_KEY_ALGORITHM(base64StringToArrayBuffer(ivRSAPSS)),
        passwordKey,
        arrayBuffer
      )
    )
    .then(arrayBuffer =>
      wca.importKey('pkcs8', arrayBuffer, RSA_PSS_IMPORT_ALGORITHM(), true, [
        'sign'
      ])
    );

export const importRSAPSSPublicKey = key =>
  Promise.resolve(base64StringToArrayBuffer(key)).then(arrayBuffer =>
    wca.importKey('spki', arrayBuffer, RSA_PSS_IMPORT_ALGORITHM(), true, [
      'verify'
    ])
  );

export const importDataNameKey = (key, privateRSAOAEP) =>
  Promise.resolve(base64StringToArrayBuffer(key))
    .then(arrayBuffer =>
      wca.decrypt(RSA_OAEP_ALGORITHM(), privateRSAOAEP, arrayBuffer)
    )
    .then(arrayBuffer =>
      wca.importKey(
        'raw',
        arrayBuffer,
        AES_CBC_PASSWORD_KEY_GEN_ALGORITHM(),
        true,
        ['encrypt', 'decrypt']
      )
    );

export const exportToPublicPEM = cryptoKey =>
  Promise.resolve(wca.exportKey('spki', cryptoKey)).then(arrayBuffer =>
    arrayBufferToBase64(arrayBuffer)
  );

export const exportToPrivatePEM = cryptoKey =>
  Promise.resolve(wca.exportKey('pkcs8', cryptoKey)).then(arrayBuffer =>
    arrayBufferToBase64(arrayBuffer)
  );

export const createFingerprint = string =>
  Promise.resolve(base64StringToArrayBuffer(string))
    .then(arrayBuffer => wca.digest(FINGERPRINT_ALGORITHM, arrayBuffer))
    .then(hashBuffer => Array.from(new Uint8Array(hashBuffer)))
    .then(hashArray =>
      hashArray.map(b => b.toString(16).padStart(2, '0')).join(':')
    );

export const exportSymmetricKey = cryptoKey =>
  Promise.resolve(wca.exportKey('raw', cryptoKey)).then(arrayBuffer =>
    arrayBufferToBase64(arrayBuffer)
  );

export const encryptDocument = async (
  blob,
  rsaPSSPrivateKey,
  rsaOAEPPublicKey
) => {
  const iv = await newIV().then(base64 => base64StringToArrayBuffer(base64));
  const key = await wca.generateKey(
    AES_CBC_PASSWORD_KEY_GEN_ALGORITHM(),
    true,
    ['encrypt', 'decrypt']
  );
  const encryptedBlob = await Promise.resolve(
    blobToArrayBuffer(blob)
  ).then(arrayBuffer =>
    wca.encrypt(AES_CBC_PASSWORD_KEY_ALGORITHM(iv), key, arrayBuffer)
  );
  const encryptedKey = await Promise.resolve(exportSymmetricKey(key))
    .then(base64 => base64StringToArrayBuffer(base64))
    .then(async arrayBuffer =>
      wca.encrypt(RSA_OAEP_ALGORITHM(), rsaOAEPPublicKey, arrayBuffer)
    );
  const signature = await wca.sign(
    RSA_PSS_ALGORITHM(),
    rsaPSSPrivateKey,
    encryptedBlob
  );
  const completeBlob = new Blob([encryptedBlob, iv, encryptedKey, signature]);
  return await blobToArrayBuffer(completeBlob).then(arrayBuffer =>
    arrayBufferToBase64(arrayBuffer)
  );
};

export const encryptWithDataNameKey = (filename, dataNameKey, iv) =>
  Promise.resolve(stringToArrayBuffer(filename))
    .then(async arrayBuffer =>
      wca.encrypt(
        AES_CBC_PASSWORD_KEY_ALGORITHM(base64StringToArrayBuffer(iv)),
        dataNameKey,
        arrayBuffer
      )
    )
    .then(arrayBuffer => arrayBufferToBase64(arrayBuffer));

export const decryptedBlob = async blob => {
  const arrayBuffer = await blobToArrayBuffer(blob);
  const { byteLength } = arrayBuffer;

  const encryptedBlob = arrayBuffer.slice(BEGIN_BLOB(), END_BLOB(byteLength));
  const decryptedBlob = await decryptBlob(
    encryptedBlob,
    arrayBuffer.slice(BEGIN_IV(byteLength), END_IV(byteLength)),
    arrayBuffer.slice(
      BEGIN_AES_KEYS_BLOCK(byteLength),
      END_AES_KEYS_BLOCK(byteLength)
    )
  );
  return new Blob([decryptedBlob]);
};

const decryptBlob = (encryptedBlob, iv, aesKeyBlock) =>
  wca
    .importKey(
      'raw',
      base64StringToArrayBuffer(aesKeyBlock),
      AES_CBC_PASSWORD_KEY_GEN_ALGORITHM(),
      true,
      ['encrypt', 'decrypt']
    )
    .then(cryptoKey =>
      wca.decrypt(AES_CBC_PASSWORD_KEY_ALGORITHM(iv), cryptoKey, encryptedBlob)
    );
