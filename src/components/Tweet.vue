<template>
  <div v-if="tweet.profile" class="w-full p-4 border-b hover:bg-lightest flex">
    <div class="flex-none mr-4">
      <a :href="`#/${tweet.profile.screenName}`">
        <img :src="`${tweet.profile.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none"/>
      </a>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold">{{ tweet.profile.name }}</p>
        <p class="text-sm text-dark ml-2">@{{ tweet.profile.screenName }}</p>
        <p class="text-sm text-dark ml-2">·</p>
        <p class="text-sm text-dark ml-2">{{ tweet.createdAt | timeago }}</p>
        <i class="fas fa-angle-down text-sm ml-auto"></i>
      </div>
      <p v-if="tweet.inReplyToUsers && tweet.inReplyToUsers.length > 0" class="text-dark">
        Replying to {{ tweet.inReplyToUsers.map(x => `@${x.screenName}`).join(",") }}
      </p>
      <p class="pb-2">
        {{ tweet.text }}
      </p>
      <div class="flex w-full">
        <div class="flex items-center text-sm text-dark w-1/4">
          <button @click="replyToTweet()" class="mr-2 rounded-full hover:bg-lighter">
            <i class="far fa-comment"></i>
          </button>
          <p v-if="tweet.replies > 0"> {{ tweet.replies }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <button @click="retweetTweet()" class="mr-2 rounded-full hover:bg-lighter">
            <i :class="`fas fa-retweet ${ tweet.retweeted ? 'text-green-500' : '' }`"></i>
          </button>
          <p v-if="tweet.retweets > 0"> {{ tweet.retweets }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <button @click="likeTweet()" class="mr-2 rounded-full hover:bg-lighter">
            <i :class="`fas fa-heart ${ tweet.liked ? 'text-red-600' : '' }`"></i>
          </button>
          <p v-if="tweet.likes > 0"> {{ tweet.likes }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <i class="fas fa-share-square mr-3"></i>
        </div>
      </div>
    </div>

    <ReplyOverlay :tweet="tweet" :showReplyOverlay.sync="showReplyOverlay" />
  </div>  
</template>

<script>
import ReplyOverlay from './ReplyOverlay.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Tweet',
  props: ['tweet'],
  components: {
    ReplyOverlay
  },
  data() {
    return {
      showReplyOverlay: false,
    }
  },
  methods: {
    ...mapActions('twitter', {
      like: 'likeTweet',
      unlike: 'unlikeTweet',
      retweet: 'retweetTweet',
      unretweet: 'unretweetTweet',
      reply: 'replyTweet',
    }),
    replyToTweet() {
      this.showReplyOverlay = true
    },
    async retweetTweet() {
      if (!this.tweet.retweeted) {
        this.tweet.retweeted = true
        this.tweet.retweets++
        await this.retweet(this.tweet.id)
        .catch(err => {
          console.error(`failed to retweet [${this.tweet.id}]`, err)
          this.tweet.retweeted = false
          this.tweet.retweets--
        })
      } else {
        this.tweet.retweeted = false
        this.tweet.retweets--
        await this.unretweet(this.tweet.id)
        .catch(err => {
          console.error(`failed to unretweet [${this.tweet.id}]`, err)
          this.tweet.retweeted = true
          this.tweet.retweets++
        })        
      }
    },
    async likeTweet() {
      if (!this.tweet.liked) {
        this.tweet.liked = true
        this.tweet.likes++
        await this.like(this.tweet.id)
        .catch(err => {
          console.error(`failed to like tweet [${this.tweet.id}]`, err)
          this.tweet.liked = false
          this.tweet.likes--
        })
      } else {
        this.tweet.liked = false
        this.tweet.likes--
        await this.unlike(this.tweet.id)
        .catch(err => {
          console.error(`failed to unlike tweet [${this.tweet.id}]`, err)
          this.tweet.liked = true
          this.tweet.likes++
        })
      }
    },
  }
}
</script>