import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import userModule from './modules/user/index.js';

export default createStore({
  modules: {
    auth: authModule,
    user: userModule
  }
});
