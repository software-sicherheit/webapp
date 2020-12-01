export default {
  setUsers(state, payload) {
    state.users = payload;
  },
  deleteUser(state, payload) {
    state.users = state.users.filter(user => user.id !== payload.userId);
  }
};
