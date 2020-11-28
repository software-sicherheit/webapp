export default {
  addDocument(state, payload) {
    state.documents.push(payload.document);
  },
  removeDocument(state, payload) {
    state.documents = state.documents.filter(
      document => document.id !== payload.documentId
    );
  },
  setAllDocument(state, payload) {
    state.documents = payload;
  }
};
