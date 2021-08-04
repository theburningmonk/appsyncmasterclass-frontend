<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="flex container h-screen w-full">
      <SideNav />

      <div class="w-1/2 h-full overflow-y-scroll">
        Profile
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
export default {
  name: 'Profile',
  components: {
    SideNav,
    SearchBar
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