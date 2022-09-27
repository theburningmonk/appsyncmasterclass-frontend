<template>
  <div class="w-full px-4 py-2 border-b hover:bg-lightest flex flex-row">
    <div class="flex-none">
      <a :href="`#/${user.screenName}`">
        <img :src="`${user.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full" loading="lazy"/>
      </a>
    </div>
    <div class="ml-2 flex flex-col w-full">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col">
          <p class="font-bold">{{ user.name }}</p>
          <p class="text-dark text-sm">@{{ user.screenName }}</p>
        </div>
        <div v-if="profile.id !== user.id">
          <button v-if="!user.following"
                  @click="followUser()" 
                  class="ml-auto text-blue font-bold px-4 py-1 rounded-full border border-blue mb-2 hover:bg-lightblue">
            Follow
          </button>
          <button v-if="user.following"
                  @mouseover="followingLabel='Unfollow'"
                  @mouseleave="followingLabel='Following'"
                  @click="unfollowUser()"
                  class="ml-auto text-white bg-blue font-bold px-4 py-1 rounded-full border mb-2 hover:bg-red-700">
            {{ followingLabel }}
          </button>
        </div>
      </div>
      <div>
        <p>{{ user.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'User',
  props: ['user'],
  computed: {
    ...mapGetters('twitter', [
      'profile',
    ]),
  },
  methods: {
    ...mapActions('twitter', { 
      follow: 'followUser',
      unfollow: 'unfollowUser',
    }),
    async followUser() {
      this.user.following = true
      await this.follow(this.user.id).catch(err => {
        console.error(`failed to follow [${this.user.id}]`, err)
        this.user.following = false
      })
    },
    async unfollowUser() {
      this.user.following = false
      await this.unfollow(this.user.id).catch(err => {
        console.error(`failed to unfollow [${this.user.id}]`, err)
        this.user.following = true
      })
    },
  },
  data() {
    return {
      followingLabel: 'Following'
    }
  }
}
</script>