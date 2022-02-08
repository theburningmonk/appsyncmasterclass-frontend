<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click.prevent="$emit('update:showNewMessageModal', false);"></div>

    <div class="modal-main bg-white mx-auto rounded-lg z-50 overflow-y-auto w-full sm:w-3/5 md:w-2/5 max-h-full">
      <div class="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
        <div class="flex flex-row mt-1 ml-4">
          <i @click="$emit('update:showNewMessageModal', false);" class="fas fa-times text-blue text-2xl w-10 h-10 mr-1 xl:mr-6 mt-1 pt-1 pl-3 rounded-full bg-white hover:bg-lightblue"></i>
          <p class="text-xl pt-1 font-bold mt-1">New message</p>
        </div>
      </div>

      <div class="border-l-2 border-r-2 border-white">
        <div class="p-3 flex flex-col border-b">
          <div class="lg:block w-full">
            <i class="fas fa-search absolute mt-3 ml-5 text-m text-light"></i>
            <input class="pl-12 rounded-full w-full p-2 bg-lighter text-m focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue" 
              placeholder="Search People" type="search"
              v-model="query"
              v-on:keyup.enter="submit()"
            />
          </div>
        </div>

        <Loader :loading="loading" />
        <div v-if="!loading && results && results.length === 0" class="flex flex-col items-center justify-center w-full pt-10">
          <div class="w-3/5">
            <p class="font-bold text-lg">No results for "{{noResults}}"</p>
            <p class="text-sm text-dark">The query you entered did not bring up any results.</p>
          </div>
        </div>

        <ResultsNewMessage 
          :results="results" 
          @selected="selected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ResultsNewMessage from '../components/ResultsNewMessage.vue'
import Loader from '../components/Loader.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "NewMessageOverlay",
  components: {
    ResultsNewMessage,
    Loader,
  },
  props: ["showNewMessageModal"],
  data() {
    return {
      loading: true,
      query: '',
      noResults: '',
      mode: 'People',
    }
  },
  computed: {
    ...mapGetters('twitter', {
      results: 'search'
    }),
    ...mapGetters('twitter', [
      'profile', 
    ]),
  },
  methods: {
    ...mapActions('twitter', [ 
      'loadProfile',
      'loadSearch',
      'loadMoreSearch',
      'resetSearch'
    ]),
    async openConversation(user) {
      console.log(user);
      this.$emit('update:showNewMessageModal', false);
    },
    async submit() {
      this.noResults = this.query;
      this.resetSearch();
      await this.loadSearch({
        query: this.query, 
        mode: this.mode,
        limit: 10,
      }).then(() => {
        this.loading = false;
      });
    },
    selected(user) {
      this.$emit('selected', user);
    } 
  },
  created() {
    window.addEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showNewMessageModal', false);
    })
    this.submit();
  },
  destroyed: function() {
    window.removeEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showNewMessageModal', false);
    })
  }
}
</script>