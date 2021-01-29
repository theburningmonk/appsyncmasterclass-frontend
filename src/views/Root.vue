<template>
  <div class="flex w-full h-screen">
    <!-- left side -->
    <div class="flex w-1/2 h-full bg-blue">
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex flex-col">
          <div class="flex items-center">
            <i class="fas fa-search text-white text-2xl mr-5"></i>
            <p class="text-white font-bold text-xl">Follow your interests.</p>
          </div>
          <div class="flex items-center mt-10">
            <i class="fas fa-user-friends text-white text-2xl mr-4"></i>
            <p class="text-white font-bold text-xl">Hear what people are talking about.</p>
          </div>
          <div class="flex items-center mt-10">
            <i class="fas fa-comment text-white text-2xl mr-5"></i>
            <p class="text-white font-bold text-xl">Join the conversation.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- right side -->
    <div class="flex w-1/2 h-full">
      <div class="flex flex-col w-1/2 font-bold">
        <i class="fab fa-twitter text-blue text-4xl mb-5"></i>
        <p class="text-3xl mb-12">See what's happening in the world right now</p>
        <p>Join Twitter today.</p>
        <button class="rounded-full bg-blue font-bold text-lg text-white mt-4 p-3 hover:bg-darkblue">Sign up</button>
        <button class="rounded-full border border-blue bg-white font-bold text-lg text-blue mt-4 p-3 hover:bg-lightblue">Log in</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Root',
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