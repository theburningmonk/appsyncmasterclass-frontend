<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="flex container h-screen w-full">
      <SideNav />

      <div class="w-full md:w-2/3 lg:w-1/2 h-full overflow-y-scroll" v-scroll:bottom="loadMore">
        <div class="px-5 py-3 border-b border-lighter flex items-center">
          <button @click="gotoHome()" class="rounded-full md:pr-2 focus:outline-none hover:bg-lightblue">
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
          <div class="lg:block ml-4">
            <h1 class="text-xl font-bold">{{ profile.name || 'Profile' }}</h1>
            <p v-if="!noUser" class="text-left text-sm leading-tight text-dark">{{ profile.tweetsCount }} Tweets</p>
          </div>
        </div>

        <!-- background image -->
        <div class="border-b-1 border-lighter flex"
            style="height:200px; display:block">
          <div v-if="profile.backgroundImageUrl" class="h-full max-h-full">
            <img :src="profile.backgroundImageUrl" class="h-full w-full object-cover" loading="lazy"/>
          </div>
          <div v-if="!profile.backgroundImageUrl"
              class="bg-gray-400 h-full max-h-full">          
          </div>
        </div>

        <!-- profile details -->
        <div class="py-3 flex flex-col">
          <div class="px-3 flex flex-row justify-between">
            <img v-if="profile" :src="profile.imageUrl"
                loading="lazy" 
                class="w-24 h-24 md:w-32 md:h-32 rounded-full border-white"
                style="margin-top: -80px; border-width: 6px;"/>

            <div v-if="isSelf && profile">
              <button v-if="profile.imageUrl === null || profile.imageUrl === 'default_profile.png'"
                      @click="setUpProfile()" 
                      class="text-xs md:text-base md:ml-auto text-blue font-bold px-4 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                Set up profile
              </button>
              <button v-if="profile.imageUrl !== null && profile.imageUrl !== 'default_profile.png'"
                      @click="editProfile()" 
                      class="text-xs md:text-base md:ml-auto text-blue font-bold px-4 py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                Edit profile
              </button>
            </div>

            <div v-if="!noUser && !isSelf && !loading">
              <button class="text-xs md:text-base md:ml-auto mr-1 md:mr-3 text-blue font-bold px-3 py-1 md:px-3 md:py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                <i class="fas fa-ellipsis-h"></i>
              </button>
              <button v-if="profile.followedBy" class="text-xs md:text-base md:ml-auto mr-1 md:mr-3 text-blue font-bold px-3 py-1 md:px-3 md:py-2 rounded-full border border-blue mb-2 hover:bg-lightblue">
                <i @click="sendMessage()" class="fas fa-envelope"></i>
              </button>
              <button v-if="!profile.following"
                      @click="followUser()" 
                      class="text-xs md:text-base md:ml-auto text-blue font-bold px-2 py-1 md:px-4 md:py-2 rounded-full border border-blue mb-2 hover:bg-lightblue w-24 md:w-28">
                Follow
              </button>
              <button v-if="profile.following"
                      @mouseover="followingLabel='Unfollow'"
                      @mouseleave="followingLabel='Following'"
                      @click="unfollowUser()"
                      class="text-xs md:text-base md:ml-auto mr-1 md:mr-3 text-white bg-blue font-bold px-3 py-1 md:px-3 md:py-2 rounded-full border mb-2 hover:bg-red-700 w-22 md:w-28">
                {{ followingLabel }}
              </button>
            </div>
          </div>
          <div v-if="!noUser && !loading" class="px-3">
            <p class="font-bold text-xl">{{profile.name}}</p>
            <p class="text-dark">@{{profile.screenName}}<span v-if="profile.followedBy" class="text-sm font-medium bg-gray-100 py-1 px-1 mx-2 rounded text-gray-500 align-middle">Follows you</span></p>
            <p class="my-2">{{profile.bio}}</p>
            <div class="flex flex-col md:flex-row mt-1 mb-2">
              <div v-if="profile.location" class="flex flex-row mr-4">
                <i class="fas fa-map-marker-alt text-dark align-text-bottom pt-1 mr-2" ></i>
                <p class="text-dark">{{profile.location}}</p>
              </div>
              <div v-if="profile.website" class="flex flex-row mr-4">
                <i class="fas fa-link text-dark align-text-bottom pt-1 mr-2" ></i>
                <a :href="`${profile.website}`" target="_blank" class="text-dark">{{profile.website.replace('https://', '').replace('http://', '')}}</a>
              </div>
              <div v-if="joinedDate" class="flex flex-row mr-4">
                <i class="far fa-calendar-alt text-dark align-text-bottom pt-1 mr-2"></i>
                <p class="text-dark">Joined {{joinedDate}}</p>
              </div>
            </div>
            <div v-if="!noUser && !loading" class="flex flex-row mt-1">
              <button @click="goToFollowing()" class="mr-4 flex flex-row hover:underline">
                <span class="font-bold">{{profile.followingCount}}</span>
                <span class="text-dark whitespace-pre"> Following</span>
              </button>
              <button @click="goToFollowers()" class="flex flex-row hover:underline">
                <span class="font-bold">{{profile.followersCount}}</span>
                <span class="text-dark whitespace-pre"> Followers</span>
              </button>
            </div>
          </div>
          <div v-if="noUser" class="px-5">
            <p class="text-black text-lg">@{{this.$route.params.screenName}}</p>
          </div>
          <div v-if="!noUser && !loading" class="flex flex-row justify-evenly mt-2">
            <button class="flex-grow text-dark font-bold border-b-2 border-blue p-1 md:px-2 md:py-4 hover:bg-lightblue">Tweets</button>
            <button class="flex-grow text-dark font-bold border-b-2 p-1 md:px-2 md:py-4 hover:bg-lightblue">Tweets & replies</button>
            <button class="flex-grow text-dark font-bold border-b-2 p-1 md:px-2 md:py-4 hover:bg-lightblue">Media</button>
            <button class="flex-grow text-dark font-bold border-b-2 p-1 md:px-2 md:py-4 hover:bg-lightblue">Like</button>
          </div>
        </div>

        <!-- tweets -->
        <Loader :loading="loading" />
        <div v-if="!noUser && !loading && tweets.length === 0" class="flex flex-col items-center justify-center w-full pt-10">
          <p class="font-bold text-lg"><span>{{ isSelf ? 'You': `@${profile.screenName}` }}</span> haven’t Tweeted yet</p>
          <p class="text-sm text-dark">When <span>{{ isSelf ? 'you post': `@${profile.screenName} posts` }}</span> a Tweet, it’ll show up here.</p>
          <button v-if="isSelf" class="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
            <p class="hidden lg:block">Tweet now</p>
            <i class="fas fa-plus lg:hidden"></i>
          </button>
        </div>
        <div v-if="noUser" class="flex flex-col items-center justify-center">
          <div class="w-3/5 flex flex-col items-left mt-10">
            <p class="font-bold text-2xl">This account doesn’t exist</p>
            <p class="text-lg text-dark">Try searching for another.</p>
          </div>
        </div>

        <Tweets v-if="!noUser" :tweets="tweets" />
      </div>

      <div class="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
        <SearchBar/>
      </div>

      <SetUpProfileOverlay 
        v-if="showSetUpProfileModal" 
        :showSetUpProfileModal.sync="showSetUpProfileModal" />

      <EditProfileOverlay 
        v-if="showEditProfileModal" 
        :showEditProfileModal.sync="showEditProfileModal" />
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import SearchBar from '../components/SearchBar.vue'
import Tweets from '../components/Tweets.vue'
import SetUpProfileOverlay from '../components/SetUpProfileOverlay.vue'
import EditProfileOverlay from '../components/EditProfileOverlay.vue'
import Loader from '../components/Loader.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Profile',
  components: {
    SideNav,
    SearchBar,
    Tweets,
    SetUpProfileOverlay,
    EditProfileOverlay,
    Loader,
  },
  data() {
    return {
      showSetUpProfileModal: false,
      showEditProfileModal: false,
      isSelf: false,
      followingLabel: 'Following',
      loading: true,
      noUser: false,
    }
  },
  computed: {
    ...mapGetters('twitter', {
      userProfile: 'profile',
      isMySelf: 'isSelf',
    }),
    ...mapGetters('profilePage', {
      nextToken: 'nextTokenTweets'
    }),
    ...mapGetters('profilePage', [
      'profile', 
      'joinedDate',
      'tweets', 
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUserIfAlreadyAuthenticated', 
    ]),
    ...mapActions('profilePage', [
      'loadProfile',
      'loadTweets',
      'loadMoreTweets'
    ]),
    ...mapActions('profilePage', { 
      follow: 'followUser',
      unfollow: 'unfollowUser',
    }),
    gotoHome() {
      this.$router.push({
        name: 'Home',
      })
    },
    sendMessage() {
      const conversationId = `${this.userProfile.id}_${this.profile.id}`
      this.$router.push({
        name: 'Messages',
        params: {
          conversation: conversationId
        }
      })
    },
    goToFollowing() {
      this.$router.push({
        name: 'Following',
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
    },
    setUpProfile() {
      this.showSetUpProfileModal = true
    },
    editProfile() {
      this.showEditProfileModal = true
    },
    async followUser() {
      this.profile.following = true;
      this.profile.followersCount++;
      await this.follow(this.profile.id).catch(err => {
        console.error(`failed to follow [${this.profile.id}]`, err);
        this.profile.following = false;
        this.profile.followersCount--;
      })
    },
    async unfollowUser() {
      this.profile.following = false;
      this.profile.followersCount--;
      await this.unfollow(this.profile.id).catch(err => {
        console.error(`failed to unfollow [${this.profile.id}]`, err);
        this.profile.following = true;
        this.profile.followersCount++;
      })
    },
    async loadMore() {
      console.log('loading...');
      await this.loadMoreTweets(10).catch(error => {
        console.log(error);
      })
    }
  },
  async created() {
    if (this.tweets.length >0) this.loading = false;
    await this.loginUserIfAlreadyAuthenticated();
    const screenName = this.$route.params.screenName;
    this.isSelf = this.isMySelf(screenName);
    await Promise.all([
      this.loadProfile(screenName),
      this.loadTweets(screenName)
        .then(()=>this.loading = false)
        .catch(()=>{ 
          this.loading = false;
          this.noUser = true;
        })
    ]);
  },
}
</script>