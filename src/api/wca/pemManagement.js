const PEM_PUBLIC_HEADER = '-----BEGIN PUBLIC KEY BLOCK-----';
const PEM_PUBLIC_FOOTER = '-----END PUBLIC KEY BLOCK-----';
const PEM_PRIVATE_HEADER = '-----BEGIN PRIVATE KEY BLOCK-----';
const PEM_PRIVATE_FOOTER = '-----END PRIVATE KEY BLOCK-----';
const PEM_VERSION_HEADER = 'Version: E2E Cloud Storage';

export const addPublicHeaderFooter = publicKey =>
  `${PEM_PUBLIC_HEADER}\n${PEM_VERSION_HEADER}\n${publicKey}\n${PEM_PUBLIC_FOOTER}`;

export const addPrivateHeaderFooter = privateKey =>
  `${PEM_PRIVATE_HEADER}\n${PEM_VERSION_HEADER}\n${privateKey}\n${PEM_PRIVATE_FOOTER}`;
