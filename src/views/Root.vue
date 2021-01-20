<template>
  <div>
    <h1>Root</h1>
    <amplify-authenticator usernameAlias="email">
      <amplify-sign-out/>
    </amplify-authenticator>
  </div>
</template>

<script>
export default {
  name: 'Root'
}
</script>