<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id">
      <Tweet :tweet="tweet" />         
    </div>
  </div>  
</template>

<script>
import Tweet from './Tweet.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Tweets',
  components: {
    Tweet
  },
  computed: {
    ...mapGetters('twitter', {
      nextToken: 'nextTokenTweets'
    }),
    ...mapGetters('twitter', [
      'profile', 
      'tweets', 
    ]),    
  }
}
</script>