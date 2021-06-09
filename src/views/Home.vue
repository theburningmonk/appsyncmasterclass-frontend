<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side navigation -->
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
      Side Navigation
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
  name: 'Home'
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