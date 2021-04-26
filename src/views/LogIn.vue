<template>
  <div class="w-full mt-5 flex justify-center items-center flex-col">
    <i class="fab fa-twitter text-blue text-4xl mb-8"></i>
    <p class="font-bold text-2xl mb-4">Log in to Twitter</p>
    <div class="w-1/3 bg-lightblue border-b-2 border-dark mb-4 p-2">
      <p class="text-dark">Phone, email, or username</p>
      <input v-model="email" class="w-full bg-lightblue text-lg" type="text">
    </div>
    <div class="w-1/3 bg-lightblue border-b-2 border-dark mb-4 p-2">
      <p class="text-dark">Password</p>
      <input v-model="password" class="w-full bg-lightblue text-lg" type="password">
    </div>
    <button class="w-1/3 font-bold rounded-full bg-blue text-white p-3 pl-3 pr-3 hover:bg-darkblue">Log in</button>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data() {
    return {
      email: '',
      password: ''
    }
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
