import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import BaseSpinner from './components/ui/BaseSpinner.vue';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('pv-button', Button);
app.component('pv-card', Card);
app.component('pv-dialog', Dialog);
app.component('base-spinner', BaseSpinner);

app.config.globalProperties.$primevue = { ripple: true };

app.mount('#app');
