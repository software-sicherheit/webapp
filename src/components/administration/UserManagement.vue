<template>
  <pv-dialog pv-dialog header="User Management" v-model:visible="isVisible">
    <template #default>
      <h4>Which users should be deleted?</h4>
      <Listbox
        v-model="selectedUsers"
        :options="users"
        :multiple="true"
        :filter="true"
        optionLabel="name"
        listStyle="max-height:25vh"
      >
        <template #option="slotProps">
          <div class="country-item">
            <div>{{ slotProps.option.name }}</div>
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
      selectedUsers: [],
      users: [
        { id: '0', name: 'User 1' },
        { id: '1', name: 'User 2' },
        { id: '2', name: 'User 3' },
        { id: '3', name: 'User 4' },
        { id: '4', name: 'User 5' },
        { id: '5', name: 'User 6' },
        { id: '6', name: 'User 7' },
        { id: '7', name: 'User 8' },
        { id: '8', name: 'User 9' },
        { id: '9', name: 'User 10' }
      ]
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
      console.log(84651);
    },
    confirmDialog() {
      console.log('Now Deleting selected user...');
      console.log(this.selectedUsers);
      this.selectedUsers = [];
      this.$emit('close-dialog');
    }
  }
};
</script>
