<template>
  <div>
    <i class="fas fa-search absolute mt-2 ml-5 text-sm text-light"></i>
    <input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
      placeholder="Search Tweet"
      v-model="query"
      v-on:keyup.enter="submit()"
    />
  </div>
</template>

<script> 
export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    submit() {
      this.$router.push({  
        name: 'Search',
        query: { q: this.query } 
      });
    }
  },
}
</script>