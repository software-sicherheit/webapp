export default {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isAdmin() {
    return false;
  },
  isUser(state) {
    return !!state.token;
  },
  userId(state) {
    return state.userId;
  }
};
