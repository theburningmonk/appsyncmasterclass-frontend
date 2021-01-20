import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_G0S2EuViF',
    userPoolWebClientId: '2elpvum0k1l6qpf0iqgeh0jh4q',
    mandatorySignIn: true
  }
})

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://t6fywejiqffdjdwlbrslhhzg3e.appsync-api.eu-west-1.amazonaws.com/graphql',
  'aws_appsync_region': 'eu-west-1',
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}

Amplify.configure(myAppConfig);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
