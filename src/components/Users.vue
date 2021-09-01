<template>
  <div>
    <span v-if="users.length === 0">No results</span>
    <div v-bind:key="user.id" v-for="user in users">
      <User :user="user"/>
    </div>
  </div>
</template>

<script>
import User from './User.vue';

export default {
  name: 'Users',
  props: ['users'],
  components: {
    User,
  }
}
</script>