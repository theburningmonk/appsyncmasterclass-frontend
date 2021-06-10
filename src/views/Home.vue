<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side navigation -->
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between min-w-max">
      <div>
        <button class="h-12 w-12 hover:bg-lightblue text-3xl text-blue rounded-full">
          <i class="fab fa-twitter"></i>
        </button>
        <div>
          <button 
            v-for="tab in tabs" :key="tab.id"
            class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-lightblue rounded-full mr-auto mb-3">
            <i class="text-2xl mr-4" :class="tab.icon"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }}</p>
          </button>
        </div>
        <button class="text-white bg-blue rounded-full font-semibold h-12 lg:h-auto w-20 lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
    </div>

    <!-- tweets -->
    <div class="w-1/2 h-full overflow-y-scroll">
      Tweets
    </div>

    <!-- default right bar -->
    <div class="hidden md:block w-1/3 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
      Right Bar
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tabs: [
        {icon: 'fas fa-home', title: 'Home', id: 'home', target: 'Home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
        {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
        {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
        {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
        {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
        {icon: 'far fa-user', title: 'Profile', id: 'profile', target: 'Profile'},
        {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
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