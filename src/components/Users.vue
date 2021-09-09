<template>
  <div>
    <div v-for="user in users" :key="user.id">
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