<template>
  <div>
    <div v-for="result in results" :key="result.id">
      <UserNewMessage 
        v-if="result.screenName" 
        :user="result"
        @selected="selected"
      />      
    </div>
  </div>  
</template>

<script>
import UserNewMessage from './UserNewMessage.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'ResultsNewMessage',
  props: ['results'],
  components: {
    UserNewMessage
  },
  computed: {
    ...mapGetters('twitter', {
      nextToken: 'nextTokenSearch'
    }),
    ...mapGetters('twitter', [
      'profile',
    ]),
  },
  methods: {
    selected(user) {
      this.$emit('selected', user);
    }  
  }
}
</script>