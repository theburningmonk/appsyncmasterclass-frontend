<template>
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
</template>

<script> 
export default {
  name: 'WhoToFollow',
  data() {
    return {
      followSuggestions: [
        {imageUrl: 'https://i.imgur.com/jv6Hufs.jpg', name: 'Senzo', screenName: '@senzo_HQ', id: 'senzo_HQ'},
        {imageUrl: 'https://i.imgur.com/VXcv5Sj.jpg', name: 'Ant Stanley', screenName: '@IamStan', id: 'IamStan'},
        {imageUrl: 'https://i.imgur.com/wHoKLev.jpg', name: 'Hanna', screenName: '@bestofallhans', id: 'bestofallhans'}
      ],
    }
  }
}
</script>