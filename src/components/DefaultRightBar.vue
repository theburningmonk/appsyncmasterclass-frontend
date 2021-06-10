<template>
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
</template>

<script>
export default {
  name: 'DefaultRightBar',
  data() {
    return {
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
  }
}
</script>