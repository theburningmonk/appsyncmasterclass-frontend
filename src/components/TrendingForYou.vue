<template>
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
</template>

<script> 
export default {
  name: 'TrendingForYou',
  data() {
    return {
      trending: [
        {top: 'Trending in NL', title: 'REDALERT', bottom: '7,451 tweets', id: 'NL-READALERT'},
        {top: 'Music', title: 'We Won', bottom: '135K Tweets', id: 'MUSIC-WE_WON'},
        {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets', id: 'POP-BLUE_IVY'},
        {top: 'Trending in NL', title: 'Zwarte Piet', bottom: '13.9k tweets', id: 'NL-ZWARTE_PIET'},
        {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets', id: 'TRENDING-WHEN_BEYONCE'},
      ],
    }
  }
}
</script>