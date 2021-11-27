<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="flex container h-screen w-full">
      <SideNav />

      <div class="w-full md:w-1/2 h-full overflow-y-scroll" v-scroll:bottom="loadMore">
        <div class="px-5 py-3 border-lighter flex items-center">
          <button @click="gotoHome()" class="rounded-full md:pr-2 focus:outline-none hover:bg-lightblue">
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
          <div class="lg:block ml-4 w-full">
            <i class="fas fa-search absolute mt-3 ml-5 text-m text-light"></i>
            <input class="pl-12 rounded-full w-full p-2 bg-lighter text-m focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue" 
              placeholder="Search Twitter" type="search"
              v-model="query"
              v-on:keyup.enter="submit()"
            />
          </div>
        </div>

        <!-- profile details -->
        <div class="flex flex-col">
          <div class="flex flex-row justify-evenly">
            <button class="w-full text-dark font-bold border-b-2 p-1 md:px-8 md:py-4 hover:bg-lightblue">Top</button>
            <button @click="submit('Latest')" class="w-full text-dark font-bold border-b-2 p-1 md:px-5 md:py-4 hover:bg-lightblue" :class="`${this.mode=='Latest'?'border-blue':''}`">Latest</button>
            <button @click="submit('People')" class="w-full text-dark font-bold border-b-2 p-1 md:px-5 md:py-4 hover:bg-lightblue" :class="`${this.mode=='People'?'border-blue':''}`">People</button>
            <button class="w-full text-dark font-bold border-b-2 p-1 md:px-5 md:py-4 hover:bg-lightblue">Photos</button>
            <button class="w-full text-dark font-bold border-b-2 p-1 md:px-5 md:py-4 hover:bg-lightblue">Videos</button>
          </div>
        </div>

        <!-- tweets -->
        <Loader :loading="loading" />
        <div v-if="!loading && results && results.length === 0" class="flex flex-col items-center justify-center w-full pt-10">
          <div class="w-3/5">
            <p class="font-bold text-lg">No results for "{{noResults}}"</p>
            <p class="text-sm text-dark">The term you entered did not bring up any results. You may have mistyped your term or your Search settings could be protecting you from some potentially sensitive content.</p>
          </div>
        </div>

        <Results :results="results" />
      </div>

      <div class="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll relative">
      
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import Results from '../components/Results.vue'
import Loader from '../components/Loader.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Search',
  components: {
    SideNav,
    Results,
    Loader,
  },
  data() {
    return {
      loading: true,
      query: '' || this.$route.query.q,
      noResults: '',
      mode: this.$route.query.m || 'Latest',
    }
  },
  computed: {
    ...mapGetters('twitter', [
      'profile', 
    ]),
    ...mapGetters('twitter', {
      results: 'search'
    }),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUserIfAlreadyAuthenticated', 
    ]),
    ...mapActions('twitter', [
      'loadSearch',
      'loadMoreSearch',
      'resetSearch'
    ]),
    ...mapActions('profilePage', [
      'loadProfile',
    ]),
    gotoHome() {
      this.$router.push({
        name: 'Home',
      })
    },
    submit(m = this.mode) {
      this.loading = true;
      this.resetSearch();
      this.$router.push({  
        name: 'Search',
        query: { q: this.query, m:m, hash: Date.now() } 
      });
    },
    async loadMore() {
      console.log('loading...');
      await this.loadMoreSearch({
        query: this.query, 
        mode: this.mode,
        limit: 10,
      }).catch(error => {
        console.log(error);
      })
    }
  },
  async created() {
    this.resetSearch();
    await this.loginUserIfAlreadyAuthenticated();
    this.query = this.$route.query.q;
    this.noResults = this.$route.query.q;
    await this.loadSearch({
      query: this.query, 
      mode: this.mode,
      limit: 10,
    }).then(() => this.loading = false);
  },
}
</script>