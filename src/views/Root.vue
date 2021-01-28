<template>
  <div>
    <h1>Root</h1>
    <amplify-authenticator usernameAlias="email">
      <amplify-sign-out/>
    </amplify-authenticator>
  </div>
</template>

<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Root',
  computed: {
    ...mapGetters('authentication', [
      'loggedIn',
      'user'
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUser',
      'logoutUser'
    ]),
  },
  created() {
    onAuthUIStateChange(async (state, user) => {
      if (state === AuthState.SignedIn) {
        await this.loginUser(user);
      } if (state === AuthState.SignedOut) {
        await this.logoutUser();
      }
    })
  }
}
</script>