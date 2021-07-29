<template>
  <div class="w-full border-b hover:bg-lightest flex flex-col">
    <!-- Retweet header -->
    <div class="pt-4 pl-4 flex flex-row">
      <div class="w-12 mr-4 flex justify-end">
        <i class="text-sm pt-1 fas fa-retweet text-dark"></i>
      </div>
      <p class="text-sm text-dark">{{ label }}</p>
    </div>

    <Tweet :tweet="tweet.retweetOf" />
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import Tweet from './Tweet.vue'
export default {
  name: 'Retweet',
  props: ['tweet'],
  components: {
    Tweet
  },
  data() {
    return {
      label: ''
    }
  },
  async created() {
    const user = await Auth.currentUserInfo()
    if (user.username === this.tweet.profile.id) {
      this.label = 'You Retweeted'
    } else {
      this.label = `@${this.tweet.profile.screenName} Retweeted`
    }
  }
}
</script>