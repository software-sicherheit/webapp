<template>
  <pv-dialog pv-dialog header="User Management" v-model:visible="isVisible">
    <template #default>
      <h4>Which users should be deleted?</h4>
      <p v-if="isLoading">Loading...</p>
      <Listbox
        v-else
        v-model="selectedUsers"
        :options="users"
        :multiple="false"
        :filter="false"
        optionLabel="name"
        listStyle="max-height:25vh"
      >
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.username }}</div>
          </div>
        </template>
      </Listbox>
    </template>
    <template #footer>
      <pv-button
        label="No"
        icon="pi pi-times"
        @click="closeDialog"
        class="p-button-text"
      ></pv-button>
      <pv-button
        label="Yes"
        icon="pi pi-check"
        @click="confirmDialog"
        autofocus
      ></pv-button>
    </template>
  </pv-dialog>
</template>

<script>
import Listbox from 'primevue/listbox';

export default {
  components: {
    Listbox
  },
  created() {
    this.loadUsers();
  },
  watch: {
    shallDialogBeOpen(value) {
      this.isVisible = value;
    }
  },
  props: {
    shallDialogBeOpen: {
      type: Boolean,
      required: true,
      sync: true
    }
  },
  emits: ['close-dialog'],
  data() {
    return {
      isVisible: false,
      isLoading: false,
      selectedUsers: null
    };
  },
  computed: {
    users() {
      return this.$store.getters['administration/users'];
    }
  },
  methods: {
    async loadUsers() {
      console.log('Requesting to fetch users');
      this.isLoading = true;
      try {
        // await this.$store.dispatch('administration/fetchUsers');
        console.log('Successfully fetched users');
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    },
    async confirmDialog() {
      console.log('Requesting to delete users');
      try {
        // await this.$store.dispatch('administration/deleteUsers', {
        // userId: this.selectedUsers.id
        // });
        console.log('Successfully deleted users');
      } catch (err) {
        console.error(err);
      }
      this.$emit('close-dialog');
    },
    closeDialog() {
      this.$emit('close-dialog');
    }
  }
};
</script>
