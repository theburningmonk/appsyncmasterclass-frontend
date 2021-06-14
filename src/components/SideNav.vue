<template>
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
    <div class="lg:w-full relative">
      <button @click="dropdown = !dropdown" class="flex items-center w-full hover:bg-lightblue rounded-full p-2">
        <img :src="'default_profile.png'" class="w-10 h-10 rounded-full" />
        <div class="hidden lg:block ml-4 truncate">
          <div class="text-left text-sm font-bold leading-tight truncate">User</div>
          <div class="text-left text-sm leading-tight text-dark truncate">ScreenName</div>
        </div>
        <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
      </button>
      <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
        <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest">
          <img :src="'default_profile.png'" class="w-10 h-10 rounded-full" />
          <div class="ml-4">
            <p class="text-left text-sm font-bold leading-tight">User</p>
            <p class="text-left text-sm leading-tight text-dark">ScreenName</p>
          </div>
          <i class="fas fa-check ml-auto text-blue"></i>
        </button>
        <button class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Add an existing account
        </button>
        <button class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Log out ScreenName
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
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
      dropdown: false,
    }
  },
}
</script>
