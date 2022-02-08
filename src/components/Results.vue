<template>
  <div>
    <div v-for="result in results" :key="result.id">
      <Tweet v-if="!result.retweetOf" :tweet="result" />
      <Retweet v-if="result.retweetOf" :tweet="result" />   
      <User v-if="result.screenName" :user="result"/>      
    </div>
  </div>  
</template>

<script>
import Tweet from './Tweet.vue'
import Retweet from './Retweet.vue'
import User from './User.vue'

export default {
  name: 'Results',
  props: ['results'],
  components: {
    Tweet,
    Retweet,
    User
  }
}
</script>