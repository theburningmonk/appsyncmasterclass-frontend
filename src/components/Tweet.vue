<template>
  <div class="w-full p-4 border-b hover:bg-lightest flex">
    <div class="flex-none mr-4">
      <img :src="`${tweet.profile.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none"/>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold">{{ tweet.profile.name }}</p>
        <p class="text-sm text-dark ml-2">@{{ tweet.profile.screenName }}</p>
        <p class="text-sm text-dark ml-2">{{ tweet.time }}</p>
        <i class="fas fa-angle-down text-sm ml-auto"></i>
      </div>
      <p v-if="tweet.inReplyToUser" class="text-dark">
        Replying to @{{ tweet.inReplyToUser.screenName }}
      </p>
      <p class="pb-2">
        {{ tweet.text }}
      </p>
      <div class="flex w-full">
        <div class="flex items-center text-sm text-dark w-1/4">
          <button class="mr-2 rounded-full hover:bg-lighter">
            <i class="far fa-comment"></i>
          </button>
          <p v-if="tweet.replies > 0"> {{ tweet.replies }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <button class="mr-2 rounded-full hover:bg-lighter">
            <i :class="`fas fa-retweet ${ tweet.retweeted ? 'text-green-500' : '' }`"></i>
          </button>
          <p v-if="tweet.retweets > 0"> {{ tweet.retweets }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <button class="mr-2 rounded-full hover:bg-lighter">
            <i :class="`fas fa-heart ${ tweet.liked ? 'text-red-600' : '' }`"></i>
          </button>
          <p v-if="tweet.likes > 0"> {{ tweet.likes }} </p>
        </div>
        <div class="flex items-center text-sm text-dark w-1/4">
          <i class="fas fa-share-square mr-3"></i>
        </div>
      </div>
    </div>
  </div>   
</template>

<script>
export default {
  name: 'Tweet',
  props: ['tweet'],
}
</script>