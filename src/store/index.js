import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import userModule from './modules/user/index.js';
import statisticsModule from './modules/statistics/index.js';

export default createStore({
  modules: {
    auth: authModule,
    user: userModule,
    statistics: statisticsModule
  }
});
