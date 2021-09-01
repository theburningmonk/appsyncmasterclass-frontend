<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="flex container h-screen w-full">
      <SideNav />

      <div class="w-1/2 h-full overflow-y-scroll">
        <!-- top navigation -->
        <div class="px-5 pt-3 flex items-center">
          <button @click="gotoProfile()" class="rounded-full p-3 px-4 focus:outline-none hover:bg-lightblue">
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
          <div class="lg:block ml-4">
            <h1 class="text-xl font-bold">{{ profile.name }}</h1>
            <p class="text-left text-sm leading-tight text-dark">@{{ profile.screenName }}</p>
          </div>
        </div>

        <div class="flex flex-row justify-evenly mt-2">
          <button @click="goToFollowers()" class="w-1/2 text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue">Followers</button>
          <button class="w-1/2 text-dark font-bold border-b-2 border-blue px-10 py-4 hover:bg-lightblue">Following</button>
        </div>

        <Users :users="profiles" />
      </div>      

      <div class="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
        <SearchBar/>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import SearchBar from '../components/SearchBar.vue'
import Users from '../components/Users.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Following",
  components: {
    SideNav,
    SearchBar,
    Users
  },
  data() {
    return { }
  },
  computed: {
    ...mapGetters('profilePage', [
      'profile', 
    ]),
    ...mapGetters('profilePage', {
      profiles: 'following',
      nextToken: 'nextTokenFollowing'
    }),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUserIfAlreadyAuthenticated',
    ]),
    ...mapActions('profilePage', [
      'loadProfile',
      'getFollowing'
    ]),
    gotoProfile() {
      this.$router.push({
        name: 'Profile',
        params: {
          screenName: this.profile.screenName
        }
      })
    },
    goToFollowers() {
      this.$router.push({
        name: 'Followers',
        params: {
          screenName: this.profile.screenName
        }
      })
    }
  },
  async created() {
    // handle full page reload
    await this.loginUserIfAlreadyAuthenticated();
    const screenName = this.$route.params.screenName;
    await this.loadProfile(screenName);
    await this.getFollowing({ userId: this.profile.id, limit:10 });
  }
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