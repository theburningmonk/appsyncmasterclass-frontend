<template>
  <div v-if="tweet.profile" class="w-full p-4 border-b hover:bg-lightest flex">
    <div class="flex-none mr-4">
      <img :src="`${tweet.profile.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none"/>
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

    <div v-if="showReplyOverlay" class="fixed w-full h-full z-10 top-0 left-0 flex items-center justify-center">
      <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div class="modal-main bg-white mx-auto rounded-lg z-0 overflow-y-auto" style="width:40%">
        <div class="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
          <div class="flex flex-row mt-1 ml-4">
            <i @click="showReplyOverlay=false" class="fas fa-times text-blue text-2xl mb-8 mr-6 rounded-full bg-white p-2 px-3 hover:bg-lightblue"></i>
          </div>
        </div>
    
        <div v-if="tweet.profile" class="border-l-2 border-r-2 border-white flex flex-col">
          <!-- original Tweet -->
          <div class="p-3 flex flex-row">
            <div class="flex-none mr-4">
              <img :src="`${tweet.profile.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none"/>
            </div>

            <div class="w-full">
              <div class="flex items-center w-full">
                <p class="font-semibold">{{ tweet.profile.name }}</p>
                <p class="text-sm text-dark ml-2">@{{ tweet.profile.screenName }}</p>
                <p class="text-sm text-dark ml-2">·</p>
                <p class="text-sm text-dark ml-2">{{ tweet.createdAt | timeago }}</p>
              </div>
              <p class="py-2">
                {{ tweet.text }}
              </p>
            </div>
          </div>

          <!-- reply Tweet -->
          <div class="p-3 flex flex-row">
            <div class="flex-none mr-4">
              <img :src="`${profile.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none"/>
            </div>

            <div class="w-full mb-2">
              <form v-on:submit.prevent="sendReplay" class="w-full relative">
                <textarea v-model="text" placeholder="Tweet your reply" class="w-full focus:outline-none mt-3 pb-3"></textarea>
                <div>
                  <i class="text-lg text-blue mr-4 far fa-image"></i>
                  <i class="text-lg text-blue mr-4 fas fa-film"></i>
                  <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
                  <i class="text-lg text-blue mr-4 far fa-smile"></i>
                </div>
                <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full absolute bottom-0 right-0" :class="`${this.text ? '' : ' opacity-50 cursor-not-allowed'}`">Reply</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Tweet',
  props: ['tweet'],
  data() {
    return {
      showReplyOverlay: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters('twitter', [
      'profile', 
    ]),
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
        .then(() => {
          this.$emit('retweet', this.tweet.id)
        })
        .catch(err => {
          console.error(`failed to retweet [${this.tweet.id}]`, err)
          this.tweet.retweeted = false
          this.tweet.retweets--
        })
      } else {
        this.tweet.retweeted = false
        this.tweet.retweets--
        await this.unretweet(this.tweet.id)
        .then(() => {
          this.$emit('unretweet', this.tweet.id)
        })
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
        .then(() => {
          this.$emit('like', this.tweet.id)
        })
        .catch(err => {
          console.error(`failed to like tweet [${this.tweet.id}]`, err)
          this.tweet.liked = false
          this.tweet.likes--
        })
      } else {
        this.tweet.liked = false
        this.tweet.likes--
        await this.unlike(this.tweet.id)
        .then(() => {
          this.$emit('unlike', this.tweet.id)
        })
        .catch(err => {
          console.error(`failed to unlike tweet [${this.tweet.id}]`, err)
          this.tweet.liked = true
          this.tweet.likes++
        })
      }
    },
    async sendReplay() {
      await this.reply({ tweetId: this.tweet.id, text: this.text })
      this.showReplyOverlay = false
    }
  }
}
</script>