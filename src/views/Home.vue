<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side navigation -->
    <SideNav />

    <!-- tweets -->
    <div class="w-full h-full overflow-y-scroll">
      <div class="w-full h-full overflow-y-scroll">
        <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
          <h1 class="text-xl font-bold">Home</h1>
          <i class="far fa-star text-xl text-blue"></i>
        </div>
        <div class="px-5 py-3 border-b-8 border-lighter flex">
          <div class="flex-none mr-4">
            <img :src="'default_profile.png'" class="flex-none w-12 h-12 rounded-full"/>
          </div>
          <form class="w-full relative">
            <textarea v-model="tweet.text" placeholder="What's happening?" class="w-full focus:outline-none mt-3 pb-3"></textarea>
            <div>
              <i class="text-lg text-blue mr-4 far fa-image"></i>
              <i class="text-lg text-blue mr-4 fas fa-film"></i>
              <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
              <i class="text-lg text-blue mr-4 far fa-smile"></i>
            </div>
            <button type="button" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full absolute bottom-0 right-0 " :class="`${this.tweet.text ? '' : ' opacity-50 cursor-not-allowed'}`">Tweet</button>
          </form>
        </div>

        <!-- timeline -->
        <div v-if="tweets.length === 0" class="flex flex-col items-center justify-center w-full pt-10 px-6">
          <p class="font-bold text-lg">Welcome to Twitter!</p>
          <p class="text-sm text-dark text-center">This is the best place to see what’s happening in your world. Find some people and topics to follow now.</p>
          <button class="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
            <p class="hidden lg:block">Let's go!</p>
            <i class="fas fa-plus lg:hidden"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- default right bar -->
    <div class="hidden md:block w-1/3 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative min-w-max">
      <div>
        <i class="fas fa-search absolute mt-2 ml-5 text-sm text-light"></i>
        <input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Tweet"/>
      </div>

      <div class="w-full rounded-lg bg-lightest">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for you</p>
          <i class="fas fa-cog text-lg text-blue"></i>
        </div>
        <button v-bind:key="trend.id" v-for="trend in trending" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
          <div>
            <p class="text-sm text-left leading-tight text-dark">{{ trend.top }}</p>
            <p class="font-bold text-left leading-tight">{{ trend.title }}</p>
            <p class="text-left leading-tight text-dark">{{ trend.bottom }}</p>
          </div>
          <i class="fas fa-angle-down text-lg text-dark"></i>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>

      <div class="w-full rounded-lg bg-lightest my-4">
        <div class="p-3">
          <p class="text-lg font-bold">Who to follow</p>
        </div>
        <button v-for="suggestion in followSuggestions" :key="suggestion.id" class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
          <img :src="suggestion.imageUrl" class="w-12 h-12 rounded-full" />
          <div class="hidden lg:block ml-4">
            <p class="text-left text-sm font-bold leading-tight">{{ suggestion.name }}</p>
            <p class="text-left text-sm leading-tight text-dark">{{ suggestion.screenName }}</p>
          </div>
          <button class="ml-auto text-sm text-blue font-bold px-4 py-1 rounded-full border border-blue m-2">
            Follow
          </button>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'

export default {
  name: 'Home',
  components: {
    SideNav,
  },
  data() {
    return {
      tweets: [],
      tweet: {
        text: ''
      },
      trending: [
        {top: 'Trending in NL', title: 'REDALERT', bottom: '7,451 tweets', id: 'NL-READALERT'},
        {top: 'Music', title: 'We Won', bottom: '135K Tweets', id: 'MUSIC-WE_WON'},
        {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets', id: 'POP-BLUE_IVY'},
        {top: 'Trending in NL', title: 'Zwarte Piet', bottom: '13.9k tweets', id: 'NL-ZWARTE_PIET'},
        {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets', id: 'TRENDING-WHEN_BEYONCE'},
      ],
      followSuggestions: [
        {imageUrl: 'https://i.imgur.com/jv6Hufs.jpg', name: 'Senzo', screenName: '@senzo_HQ', id: 'senzo_HQ'},
        {imageUrl: 'https://i.imgur.com/VXcv5Sj.jpg', name: 'Ant Stanley', screenName: '@IamStan', id: 'IamStan'},
        {imageUrl: 'https://i.imgur.com/wHoKLev.jpg', name: 'Hanna', screenName: '@bestofallhans', id: 'bestofallhans'}
      ],
    }
  },
}
</script>

<style>
div {
  border: 1px dashed blue;
  padding: 15px;
}
div.items-center.justify-center {
  background-color: rgba(240, 240, 240, 0.5);
}
</style>