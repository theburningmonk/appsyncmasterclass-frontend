<template>
  <div class="w-1/6 md:w-1/12 xl:w-1/6 border-r border-lighter lg:px-6 py-2 flex-col justify-between hidden sm:flex">
    <div>
      <button class="h-12 w-12 hover:bg-lightblue text-3xl text-blue rounded-full">
        <i class="ml-2 fab fa-twitter"></i>
      </button>
      <div>
        <button @click="open('Home')" class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="fa fa-home" :class="$route.name == 'Home'?'text-2xl':'text-xl'" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block" :class="$route.name == 'Home'?'font-bold':''"> Home</p>
        </button>
        <button class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="fas fa-hashtag" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block"> Explore</p>
        </button>
        <button @click="open('Notifications')" class="relative focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="fa-bell" :class="$route.name == 'Notifications'?'text-2xl fas':'text-xl far'" aria-hidden="true"></i>
          <span v-if="this.newNotifications > 0" class="absolute -mt-6 ml-2">
            <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-blue text-white">
              {{ this.newNotifications }}
            </div>
          </span>
          <p class="text-lg ml-4 text-left hidden xl:block" :class="$route.name == 'Notifications'?'font-bold':''"> Notifications</p>
        </button>
        <button @click="open('Messages')" class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="fa-envelope" :class="$route.name == 'Messages'?'text-2xl fas':'text-xl far'" aria-hidden="true"></i>
          <span v-if="this.newMessages > 0" class="absolute -mt-6 ml-2">
            <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-blue text-white">
              {{ this.newMessages }}
            </div>
          </span>
          <p class="text-lg ml-4 text-left hidden xl:block" :class="$route.name == 'Messages'?'font-bold':''"> Messages</p>
        </button><button class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="text-xl far fa-bookmark" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block"> Bookmarks</p>
        </button>
        <button class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="text-xl fas fa-clipboard-list" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block"> Lists</p>
        </button>
        <button @click="open('Profile')" class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="fa-user" :class="$route.name == 'Profile'?'text-2xl fas':'text-xl far'" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block" :class="$route.name == 'Profile'?'font-bold':''"> Profile</p></button>
        <button class="focus:outline-none hover:text-blue flex items-center px-4 py-2 hover:bg-transparent md:hover:bg-lightblue rounded-full mr-auto mb-1">
          <i class="text-xl fas fa-ellipsis-h" aria-hidden="true"></i>
          <p class="text-lg ml-4 text-left hidden xl:block"> More</p>
        </button>
      </div>

      <button @click="open('Home')" class="text-white bg-blue rounded-full font-semibold h-12 lg:h-auto w-12 xl:w-full hover:bg-darkblue p-3">
        <p class="hidden xl:block">Tweet</p>
        <i class="fas fa-plus xl:hidden"></i>
      </button>
    </div>
    <div class="xl:w-full relative mt-2 w-10 h-10">
      <button @click="dropdown = !dropdown" class="flex items-center w-full hover:bg-lightblue rounded-full">
        <img :src="`${profile.imageUrl || 'default_profile.png'}`" class="w-10 h-10 rounded-full" />
        <div class="hidden xl:block ml-4 truncate">
          <div class="text-left text-sm font-bold leading-tight truncate">{{ profile.name }}</div>
          <div class="text-left text-sm leading-tight text-dark truncate">{{ profile.ScreenName }}</div>
        </div>
        <i class="hidden xl:block fas fa-angle-down ml-auto text-lg"></i>
      </button>
      <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
        <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest">
          <img :src="`${profile.imageUrl || 'default_profile.png'}`" class="w-10 h-10 rounded-full" />
          <div class="ml-4">
            <p class="text-left text-sm font-bold leading-tight">{{ profile.name }}</p>
            <p class="text-left text-sm leading-tight text-dark">{{ profile.ScreenName }}</p>
          </div>
          <i class="fas fa-check ml-auto text-blue"></i>
        </button>
        <button class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Add an existing account
        </button>
        <button @click="signOut" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Log out {{ profile.ScreenName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'SideNav',
  data() {
    return {
      dropdown: false,
    }
  },
  computed: {
    ...mapGetters('twitter', [
      'profile',
      'newNotifications',
      'newMessages'
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'logoutUser',
    ]),
    async open(target) {
      const current = this.$route.name;
      if (target != current || this.$route.params.screenName != this.profile.screenName) {
        this.$router.push({
          name: target,
          params: {
            screenName: this.profile.screenName,
          }
        })
      }
    },
    async signOut() {
      try {
        console.log('signing out...')
        await this.logoutUser();
      } catch(error) {
        alert('Error signing out, please check console for error detail')
        console.log('error signing out: ', error)
      }
    },
  }
}
</script>