import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import userModule from './modules/user/index.js';
import storageModule from './modules/storage/index.js';
import statisticsModule from './modules/statistics/index.js';
import administrationModule from './modules/administration/index.js';

export default createStore({
  modules: {
    auth: authModule,
    user: userModule,
    storage: storageModule,
    statistics: statisticsModule,
    administration: administrationModule
  }
});
