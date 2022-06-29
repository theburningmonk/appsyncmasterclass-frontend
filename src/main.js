import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import router from './router';
import store from './store';
import directives from './directives';
import filters from './filters';
import './registerServiceWorker'

Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_UnB8qFnyz',
    userPoolWebClientId: '5eia2sdmc7omer2s27q4uavb4f',
    mandatorySignIn: true
  }
})

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://peytuqrgajgxnbzkbsizvcbpfe.appsync-api.us-east-2.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-2',
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}

Amplify.configure(myAppConfig);

Vue.config.productionTip = false

Vue.use(directives);
Vue.use(filters);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
