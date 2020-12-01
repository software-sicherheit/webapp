export const SIGNATURE_SIZE = 512;
export const AES_KEY_SIZE = 512;
export const IV_SIZE = 16;

// signature block
export const BEGIN_SIGNATURE = byteLength => byteLength - SIGNATURE_SIZE;
export const END_SIGNATURE = byteLength => byteLength;

// aes key block
export const BEGIN_AES_KEYS_BLOCK = byteLength =>
  BEGIN_SIGNATURE(byteLength) - AES_KEY_SIZE;
export const END_AES_KEYS_BLOCK = byteLength => BEGIN_SIGNATURE(byteLength);

// iv block
export const BEGIN_IV = byteLength =>
  BEGIN_AES_KEYS_BLOCK(byteLength) - IV_SIZE;
export const END_IV = byteLength => END_AES_KEYS_BLOCK(byteLength);

// blob block
export const BEGIN_BLOB = () => 0;
export const END_BLOB = byteLength => BEGIN_IV(byteLength);
