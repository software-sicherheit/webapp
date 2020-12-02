<template>
  <div class="p-grid p-jc-center p-ai-center p-mt-2">
    <div class="p-col-6">
      <key-details-card
        title="Details of RSA-OAEP"
        :publicFingerprint="rsaOaepPublicKeyFingerprint"
        :privateFingerprint="rsaOaepPrivateKeyFingerprint"
        @exportPublicKey="exportPublicRsaOaepKey"
        @exportPrivateKey="exportPrivateRsaOaepKey"
      ></key-details-card>
    </div>
    <div class="p-col-6">
      <key-details-card
        title="Details of RSA-PSS"
        :publicFingerprint="rsaPssPublicKeyFingerprint"
        :privateFingerprint="rsaPssPrivateKeyFingerprint"
        @exportPublicKey="exportPublicRsaPssKey"
        @exportPrivateKey="exportPrivateRsaPssKey"
      ></key-details-card>
    </div>
  </div>
</template>

<script>
import KeyDetailsCard from '../../components/user/KeyDetailsCard.vue';
import saveAsc from '../../api/saveAsc.js';

export default {
  components: {
    KeyDetailsCard
  },
  created() {
    this.$store.getters['user/rsaOaepPrivateKeyFingerprint'].then(key => {
      this.rsaOaepPrivateKeyFingerprint = key;
    });
    this.$store.getters['user/rsaOaepPrivateKey'].then(key => {
      this.rsaOaepPrivateKey = key;
    });
    this.$store.getters['user/rsaOaepPublicKeyFingerprint'].then(key => {
      this.rsaOaepPublicKeyFingerprint = key;
    });
    this.$store.getters['user/rsaOaepPublicKey'].then(key => {
      this.rsaOaepPublicKey = key;
    });
    this.$store.getters['user/rsaPssPrivateKeyFingerprint'].then(key => {
      this.rsaPssPrivateKeyFingerprint = key;
    });
    this.$store.getters['user/rsaPssPrivateKey'].then(key => {
      this.rsaPssPrivateKey = key;
    });
    this.$store.getters['user/rsaPssPublicKeyFingerprint'].then(key => {
      this.rsaPssPublicKeyFingerprint = key;
    });
    this.$store.getters['user/rsaPssPublicKey'].then(key => {
      this.rsaPssPublicKey = key;
    });
  },
  data() {
    return {
      rsaOaepPrivateKeyFingerprint: '',
      rsaOaepPublicKeyFingerprint: '',
      rsaPssPrivateKeyFingerprint: '',
      rsaPssPublicKeyFingerprint: ''
    };
  },
  methods: {
    exportPublicRsaOaepKey() {
      console.log(this.rsaOaepPublicKey);
      saveAsc(this.rsaOaepPublicKey, 'rsa_oaep_publickey');
    },
    exportPrivateRsaOaepKey() {
      saveAsc(this.rsaOaepPrivateKey, 'rsa_oaep_privatekey');
    },
    exportPublicRsaPssKey() {
      saveAsc(this.rsaPssPublicKey, 'rsa_pss_publickey');
    },
    exportPrivateRsaPssKey() {
      saveAsc(this.rsaPssPrivateKey, 'rsa_pss_privatekey');
    }
  }
};
</script>
