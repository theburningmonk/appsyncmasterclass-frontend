<template>
  <div v-if="showReplyOverlay" class="fixed w-full h-full z-10 top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click.prevent="$emit('update:showReplayOverlay', false);"></div>

    <div class="modal-main bg-white mx-auto rounded-lg z-0 overflow-y-auto" style="width:40%">
      <div class="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
        <div class="flex flex-row mt-1 ml-4">
          <i @click="$emit('update:showReplyOverlay', false);" class="fas fa-times text-blue text-2xl mb-8 mr-6 rounded-full bg-white p-2 px-3 hover:bg-lightblue"></i>
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
              <p class="text-sm text-dark ml-2">.</p>
              <p class="text-sm text-dark ml-2">{{ tweet.createdAt | timeago }}</p>
            </div>
            <p class="py-2" v-linkify>
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
            <form @submit.prevent="sendReplay" class="w-full relative">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ReplyOverlay",
  props: ["tweet", "showReplyOverlay"],
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapGetters('twitter', [
      'profile', 
    ]),
  },
  methods: {
    ...mapActions('twitter', {
      reply: 'replyTweet',
    }),
    async sendReplay() {
      await this.reply({ tweetId: this.tweet.id, text: this.text });
      this.$emit('update:showReplyOverlay', false);
    }
  },
  created() {
    window.addEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showReplyOverlay', false);
    })
  },
  destroyed: function() {
    window.removeEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showReplyOverlay', false);
    })
  }
}
</script>