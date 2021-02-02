<template>
  <div class="flex w-full h-screen" v-escape="esc">
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
        <button @click.prevent="setSignupStep('step1')" class="rounded-full bg-blue font-bold text-lg text-white mt-4 p-3 hover:bg-darkblue">Sign up</button>
        <button @click.prevent="showSignInPage" class="rounded-full border border-blue bg-white font-bold text-lg text-blue mt-4 p-3 hover:bg-lightblue">Log in</button>
      </div>
    </div>

    <!-- sign up modal -->
    <div v-if="showModal != ''" class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div class="absolute w-full h-full bg-gray-900 opacity-50" @click.prevent="setSignUpStep('')"></div>

      <div class="modal-main bg-white w-11/12 mx-auto rounded-lg z-50 overflow-y-auto max-h-full">
        <div v-if="showModal === 'step1'">
          <div class="pl-1 pr-4 py-1 h-12">
            <button @click="setSignUpStep('step2')" class="rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue" :class="`${!name || !email || !birthdate ? 'opacity-50 cursor-not-allowed':''}`">Next</button>
            <i class="flex justify-center fab fa-twitter text-blue text-2xl mt-2 mb-8"></i>
          </div>
          <div class="pt-5 px-8">
            <div class="flex justify-between items-center pb-8">
              <p class="text-2xl font-bold">Create your account</p>
            </div>
            <div class="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
              <p class="text-dark">Name</p>
              <input v-model="name" class="w-full bg-lightblue text-lg" type="text">
            </div>
            <div class="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
              <p class="text-dark">Email</p>
              <input v-model="email" class="w-full bg-lightblue text-lg" type="text">
            </div>
            <p class="font-bold">Date of birth</p>
            <p class="text-dark">This will not be shown publicly. Confirm your own age, even if this account is for business, a pet, or something else.</p>
            <div class="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
              <input v-model="birthdate" class="w-full bg-lightblue text-lg" type="text">
            </div>
          </div>
        </div>

        <div v-if="showModal === 'step2'">
          <div class="pl-1 pr-4 py-1 h-12">
            <button @click="setSignUpStep('step1')" class="absolute rounded-full p-2 pl-3 hover:bg-lightblue">
              <i class="fas fa-arrow-left text-blue"></i>
            </button>
            <button @click="setSignUpStep('step3')" class="rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue">Next</button>
            <i class="flex justify-center fab fa-twitter text-blue text-2xl mt-2 mb-8"></i>
          </div>
          <div class="pt-5 px-8">
            <div class="flex justify-between items-center pb-8">
              <p class="text-2xl font-bold">Customize your experience</p>
            </div>

            <div class="mt-5 mb-8">
              <p class="font-bold text-xl mb-1">Get more out of Twitter</p>
              <div class="flex justify-between items-top">
                <p>Receive email about your Twitter activity and recommendations.</p>
                <input class="mt-1 ml-2 mr-2" type="checkbox">
              </div>
            </div>

            <div class="mt-5 mb-8">
              <p class="font-bold text-xl mb-1">Connect with people you know</p>
              <div class="flex justify-between items-top">
                <p>Let others find your Twitter account by your email address.</p>
                <input class="mt-1 ml-2 mr-2" type="checkbox">
              </div>
            </div>

            <div class="mt-5 mb-5">
              <p class="font-bold text-xl mb-1">Personalized ads</p>
              <div class="flex justify-between items-top">
                <p>You will always see ads on Twitter based on your Twitter activity. When this setting is enabled, Twitter may further personalize ads from Twitter advertisers, on and off Twitter, by combining your Twitter activity with other online activity and information from partners.</p>
                <input class="mt-1 ml-2 mr-2" type="checkbox">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Root',
  data() {
    return {
      name: '',
      email: '',
      birthdate: '',
    }
  },
  computed: {
    ...mapGetters('signup', [
      'showModal'
    ]),
  },
  methods: {
    showSignInPage() {
      this.$router.push('LogIn')
    },
    ...mapActions('signup', [
      'setSignupStep'
    ]),
    setSignUpStep(step){
      switch(step){
        case 'step2':
          if (!this.name || !this.email || !this.birthdate) {
            return;
          }
          break;
      }
      this.setSignupStep(step);
    },
    esc() {
      this.setSignupStep('');
    }
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