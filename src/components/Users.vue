<template>
  <div>
    <span v-if="users.length === 0">No results</span>
    <div v-bind:key="user.id" v-for="user in users">
      <div>{{ user.id }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  props: ['users'],
}
</script>