<template>
  <div id="app">
    <amplify-authenticator usernameAlias="email">
      <amplify-sign-up
        slot="sign-up"
        :form-fields.prop="signUpFields"
      ></amplify-sign-up>
      <div>
        <h1 v-if="user && user.attributes">Hey, {{user.attributes.name}}!</h1>
        <amplify-sign-out/>
      </div>
    </amplify-authenticator>
  </div>
</template>

<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
export default {
  name: 'App',
  data() {
    return {
      user: { },
      signUpFields: [
        { type: 'username', label: 'Username (Email) *', required: true },
        { type: 'password', label: 'Password *', required: true },
        { type: 'name', label: 'Name *', required: true },
        { type: 'phone_number', label: 'Phone Number *', required: true },
      ]
    }
  },
  created() {
    // authentication state management
    onAuthUIStateChange((state, user) => {
      // set current user and load data after login
      if (state === AuthState.SignedIn) {
        this.user = user;
        console.log(user);
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
