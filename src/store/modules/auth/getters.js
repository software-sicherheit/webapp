export default {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isAdmin(state) {
    return !!state.token;
  },
  isUser(state) {
    return !!state.token;
  },
  userId(state) {
    return state.userId;
  }
};
