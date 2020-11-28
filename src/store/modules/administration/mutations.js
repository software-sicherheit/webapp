export default {
  setUsers(state, payload) {
    console.dir(payload);
    state.users = payload.users;
  },
  deleteUser(state, payload) {
    state.users = state.users.filter(user => user.id !== payload.userId);
  }
};
