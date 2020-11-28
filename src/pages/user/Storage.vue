<template>
  <div class="p-grid p-jc-center p-ai-center p-mt-6">
    <div class="p-col-11">
      <data-table
        ref="dt"
        :value="documents"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} documents"
      >
        <template #header>
          <div class="table-header">
            <file-upload
              mode="basic"
              :maxFileSize="1000000"
              :customUpload="true"
              @uploader="uploadDocument"
              label="Upload"
              chooseLabel="Upload"
              class="p-mr-2 p-shadow-10"
            ></file-upload>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <input-text
                v-model="filters['global']"
                placeholder="Search..."
              ></input-text>
            </span>
          </div>
        </template>

        <column field="filename" header="Filename" :sortable="true"></column>
        <column
          field="contentType"
          header="Content Type"
          :sortable="true"
        ></column>
        <column field="size" header="Size" :sortable="true">
          <template #body="slotProps">
            {{ formatBytes(slotProps.data.size) }}
          </template>
        </column>
        <column
          field="lastModifiedDate"
          header="Last Modified Date"
          :sortable="true"
        >
          <template #body="slotProps">
            {{ formatDateTime(slotProps.data.lastModifiedDate) }}
          </template>
        </column>
        <column :exportable="false">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-download"
              class="p-pv-button-rounded p-pv-button-success p-mr-2 p-shadow-10"
              :disabled="isLoading"
              @click="downloadDocument(slotProps.data.id)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-pv-button-rounded p-pv-button-warning p-shadow-10"
              :disabled="isLoading"
              @click="deleteDocument(slotProps.data.id)"
            />
          </template>
        </column>
      </data-table>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import saveData from '../../api/saveData';

export default {
  components: {
    FileUpload,
    InputText,
    DataTable,
    Column
  },
  async created() {
    await this.loadDocuments();
  },
  data() {
    return {
      isLoading: false,
      filters: {}
    };
  },
  computed: {
    documents() {
      return this.$store.getters['storage/documents'];
    }
  },
  methods: {
    formatBytes(value) {
      return value + ' Bytes';
    },
    formatDateTime(value) {
      return value.toISOString();
    },
    async loadDocuments() {
      this.isLoading = true;
      console.log('Reqeusting to load all Documents');
      try {
        await this.$store.dispatch('storage/fetchDocuments');
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    },
    async uploadDocument(event) {
      this.isLoading = true;
      console.log('Requesting to upload document...');
      try {
        const file = event.files[0];
        const document = {
          filename: file.name,
          contentType: file.type,
          size: file.size,
          lastModifiedDate: file.lastModifiedDate,
          blob: new Blob([file])
        };
        await this.$store.dispatch('storage/upload', { document: document });
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    },
    async downloadDocument(documentId) {
      this.isLoading = true;
      console.log('Requesting to download document with id=' + documentId);
      const document = this.documents.find(
        document => document.id === documentId
      );
      saveData(document.blob, document.filename);
      this.isLoading = false;
    },
    async deleteDocument(documentId) {
      this.isLoading = true;
      console.log('Requesting to delete document with id=' + documentId);
      try {
        await this.$store.dispatch('storage/delete', {
          documentId: documentId
        });
      } catch (err) {
        console.error(err);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
