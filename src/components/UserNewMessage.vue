<template>
  <div v-if="profile.id !== user.id" @click="user.followedBy && selected(user)" class="w-full px-4 py-2 border-b hover:bg-lightest flex flex-row cursor-pointer" :class="!user.followedBy?'cursor-not-allowed opacity-60':''">
    <div class="flex-none">
      <img :src="`${user.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full"/>
    </div>
    <div class="ml-2 flex flex-col w-full">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col">
          <p class="font-bold">{{ user.name }}</p>
          <p class="text-dark text-sm">@{{ user.screenName }} {{!user.followedBy?"cant'be messaged":''}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'User',
  props: ['user'],
  computed: {
    ...mapGetters('twitter', [
      'profile',
    ]),
  },
  methods: {
    selected(user) {
      this.$emit('selected', user);
    }
  }
}
</script>