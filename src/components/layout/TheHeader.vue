<template>
  <user-management
    :shallDialogBeOpen="isUserManagementDialogVisible"
    @closeDialog="closeUserManagementDialog"
  ></user-management>
  <change-password
    :shallDialogBeOpen="isChangePasswordDialogVisible"
    @closeDialog="closePasswordChangeDialog"
  ></change-password>
  <delete-account
    :shallDialogBeOpen="isDeleteAccountDialogVisible"
    @closeDialog="closeDeleteAccountDialog"
  ></delete-account>
  <menubar :model="items" class="menu">
    <template #start>
      <img class="p-mr-2" alt="logo" height="40" src="../../assets/logo.svg" />
    </template>
    <template #end>
      <pv-button
        class="p-shadow-10"
        label="Logout"
        icon="pi pi-power-off"
        @click="handleLogout"
      ></pv-button>
    </template>
  </menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import UserManagement from '../../components/administration/UserManagement.vue';
import ChangePassword from '../../components/user/ChangePassword.vue';
import DeleteAccount from '../../components/user/DeleteAccount.vue';

export default {
  components: {
    Menubar,
    UserManagement,
    ChangePassword,
    DeleteAccount
  },
  computed: {
    isAdmin() {
      return this.$store.getters['auth/isAdmin'];
    },
    items() {
      if (this.isAdmin) {
        return [
          this.storageSection,
          this.userManagementSection,
          this.statisticsSection,
          this.settingsSection
        ];
      }
      return [this.storageSection, this.settingsSection];
    },
    userManagementSection() {
      if (!this.isAdmin) {
        return null;
      }
      return {
        label: 'User Management',
        icon: 'pi pi-users',
        command: () => this.openUserManagementDialog()
      };
    },
    statisticsSection() {
      if (!this.isAdmin) {
        return null;
      }
      return {
        label: 'Statistics',
        icon: 'pi pi-chart-bar',
        to: '/statistics'
      };
    }
  },
  data() {
    return {
      isUserManagementDialogVisible: false,
      isChangePasswordDialogVisible: false,
      isDeleteAccountDialogVisible: false,
      storageSection: {
        label: 'Cloud Storage',
        icon: 'pi pi-cloud',
        to: '/storage'
      },
      settingsSection: {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          // {
          //   label: 'Change Password',
          //   icon: 'pi pi-user-edit',
          //   command: () => this.openPasswordChangeDialog()
          // },
          {
            label: 'Delete Account',
            icon: 'pi pi-user-minus',
            command: () => this.openDeleteAccountDialog()
          },
          {
            label: 'Key Management',
            icon: 'pi pi-key',
            to: '/key-management'
          }
        ]
      }
    };
  },
  methods: {
    handleLogout() {
      console.log('Handling Logout');
      this.$store.dispatch('auth/logout');
      this.$router.replace('/login');
    },
    openUserManagementDialog() {
      this.isUserManagementDialogVisible = true;
    },
    closeUserManagementDialog() {
      this.isUserManagementDialogVisible = false;
    },
    openPasswordChangeDialog() {
      this.isChangePasswordDialogVisible = true;
    },
    closePasswordChangeDialog() {
      this.isChangePasswordDialogVisible = false;
    },
    openDeleteAccountDialog() {
      this.isDeleteAccountDialogVisible = true;
    },
    closeDeleteAccountDialog() {
      this.isDeleteAccountDialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  cursor: pointer;
}
</style>
