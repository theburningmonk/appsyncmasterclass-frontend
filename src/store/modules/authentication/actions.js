import { Auth } from 'aws-amplify'
import AWS from 'aws-sdk'
import router from '../../../router'

AWS.config.region = process.env.VUE_APP_AUTH_REGION;
const IDENTITY_POOL_ID = process.env.VUE_APP_AUTH_IDENTITY_POOL_ID;
const STREAM_NAME = process.env.VUE_APP_AWS_KINESIS_FIREHOSE_DELIVERY_STREAM_NAME;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID 
})

const FirehoseClient = new AWS.Firehose();

export default {
  loginUser({ commit }, user) {
    commit("USER_LOGIN", user);
  },
  async logoutUser({ commit, dispatch }) {
    await Auth.signOut({
      global: true
    })
    commit("USER_LOGOUT");
    dispatch("signup/setSignupStep", '', { root: true });
    dispatch("twitter/unsubscribeNotifications", null, { root: true });
    dispatch("twitter/resetState", null, { root: true });
    dispatch("profilePage/resetState", null, { root: true });
    router.push('/')
  },
  async signUp({ commit }, form) {
    const user = await Auth.signUp({
      username: form.username,
      password: form.password,
      attributes: {
        name: form.name,
      }
    });
    commit("USER_SIGNUP", user);
  },
  async confirmSignUp(_, form) {
    await Auth.confirmSignUp(form.email, form.verificationCode)
  },
  async resendSignUp(_, form) {
    await Auth.resendSignUp(form.email);
  },

  async signInUser({ dispatch }, form) {
    const user = await Auth.signIn(form.email, form.password);
    await dispatch("loginUser", user);
    await dispatch("twitter/setProfile", null, { root: true });
    await dispatch("twitter/subscribeNotifications", null, { root: true });
    router.push({ name: 'Home' });
  },

  async loginUserIfAlreadyAuthenticated({ dispatch }) {
    const user = await Auth.currentUserInfo();
    if (user) {
      console.log('user is logged in already')
      await dispatch("loginUser", user);
      await dispatch("twitter/setProfile", null, { root: true });
      await dispatch("twitter/subscribeNotifications", null, { root: true });
    }
  },

  async trackEvent(_, event) {
    const response = await FirehoseClient.putRecord({
      DeliveryStreamName: STREAM_NAME,
      Record: {
        Data: JSON.stringify(event)
      }
    }).promise();
    console.log(response);
  }
};