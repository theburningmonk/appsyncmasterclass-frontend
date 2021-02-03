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
      <div class="flex items-center justify-center w-full h-full">
        <div class="flex flex-col w-1/2 font-bold">
          <i class="fab fa-twitter text-blue text-4xl mb-5"></i>
          <p class="text-3xl mb-12">See what's happening in the world right now</p>
          <p>Join Twitter today.</p>
          <button @click.prevent="setSignupStep('step1')" class="rounded-full bg-blue font-bold text-lg text-white mt-4 p-3 hover:bg-darkblue">Sign up</button>
          <button @click.prevent="showSignInPage" class="rounded-full border border-blue bg-white font-bold text-lg text-blue mt-4 p-3 hover:bg-lightblue">Log in</button>
        </div>
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
            <p class="text-dark">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
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
                <p>You will always see ads on Twitter based on your Twitter activity. When this setting is enabled, Twitter may further personalise ads from Twitter advertisers, on and off Twitter, by combining your Twitter activity with other online activity and information from our partners.</p>
                <input class="mt-1 ml-2 mr-2" type="checkbox">
              </div>
            </div>
          </div>
        </div>

        <div v-if="showModal === 'step3'">
          <div class="pl-1 pr-4 py-1 h-12">
            <button @click="setSignUpStep('step2')" class="absolute rounded-full p-2 pl-3 hover:bg-lightblue">
              <i class="fas fa-arrow-left text-blue"></i>
            </button>
            <button @click="setSignUpStep('step4')" class="rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue" :class="`${password.length < 8 ? 'opacity-50 cursor-not-allowed' : ''}`">Next</button>
            <i class="flex justify-center fab fa-twitter text-blue text-2xl mt-2 mb-8"></i>
          </div>
          <div class="pt-5 px-8">
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">You'll need a password</p>
            </div>

            <p class="text-dark mb-2">Make sure it's 8 characters or more.</p>

            <div class="w-full bg-lightblue border-b-2 border-dark p-2">
              <p class="leading-tight text-dark">Password</p>
              <input v-model="password" class="w-full bg-lightblue text-lg" :type="`${revealPassword ? 'text': 'password'}`">
            </div>

            <button @click="revealPassword = !revealPassword" class="text-blue pl-2">Reveal password</button>
          </div>
        </div>

        <div v-if="showModal === 'step4'">
          <div class="pl-1 pr-4 py-1 h-12">
            <button @click="setSignUpStep('step3')" class="absolute rounded-full p-2 pl-3 hover:bg-lightblue">
              <i class="fas fa-arrow-left text-blue"></i>
            </button>
            <p class="flex items-start ml-12 p-2 text-xl font-extrabold">Step 4 of 5</p>
          </div>
          <div class="pt-5 px-8">
            <div class="flex justify-between items-center pb-8">
              <p class="text-2xl font-bold">Create your account</p>
            </div>

            <div class="w-full bg-lightblue border-b-2 border-dark mb-6 p-2">
              <input v-model="name" class="w-full py-2 bg-lightblue text-lg" type="text">
            </div>
            <div class="w-full bg-lightblue border-b-2 border-dark mb-6 p-2">
              <input v-model="email" class="w-full py-2 bg-lightblue text-lg" type="text">
            </div>
            <div class="w-full bg-lightblue border-b-2 border-dark mb-16 p-2">
              <input v-model="birthdate" class="w-full py-2 bg-lightblue text-lg" type="text">
            </div>

            <p>By signing up, you agree to our <a href="#" class="text-blue">Terms</a>, <a href="#" class="text-blue">Privacy Policy</a> and <a href="#" class="text-blue">Cookie Use</a>.</p>
            <button @click="signMeUp" class="w-full rounded-full mt-4 py-3 bg-blue text-white font-bold hover:bg-darkblue">Sign up</button>
          </div>
        </div>

        <div v-if="showModal === 'step5'">
          <div class="pl-1 pr-4 py-1 h-12">
            <button @click="confirmUserSignUp" class="rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue" :class="`${!verificationCode ? 'opacity-50 cursor-not-allowed': ''}`">Next</button>
            <i class="flex justify-center fab fa-twitter text-blue text-2xl mt-2 mb-8"></i>
          </div>
          <div class="pt-5 px-8">
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">We sent you a code</p>
            </div>

            <p class="text-dark mb-2">Enter it below to verify {{email}}.</p>

            <div class="w-full bg-lightblue border-b-2 border-dark p-2">
              <p class="leading-tight text-dark">Verification code</p>
              <input v-model="verificationCode" class="w-full bg-lightblue text-lg" type="text">
            </div>

            <button @click="resendVerificationCode" class="text-blue pl-2 hover:underline">Didn't receive an email?</button>
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
      password: '',
      revealPassword: false,
      verificationCode: '',
    }
  },
  computed: {
    ...mapGetters('signup', [
      'showModal'
    ]),
    ...mapGetters('authentication', [
      'user'
    ]),
  },
  methods: {
    showSignInPage() {
      this.$router.push('LogIn')
    },
    ...mapActions('signup', [
      'setSignupStep'
    ]),
    ...mapActions('authentication', [
      'signUp',
      'confirmSignUp',
      'signInUser',
      'resendSignUp',
      'logoutUser'
    ]),
    async signMeUp() {
      try {
        await this.signUp({
          username: this.email,
          password: this.password,
          name: this.name,
        });
        this.setSignupStep('step5');
      } catch (error) {
        alert('Error signing up, please check console for error detail')
        console.log('error signing up:', error)
      }
    },
    async confirmUserSignUp() {
      if (!this.verificationCode) return;

      try {
        await this.confirmSignUp({
          email: this.email,
          verificationCode: this.verificationCode
        });
        await this.signIn();
      } catch (error) {
        alert('Error confirming verification code, please check console for error detail')
        console.log('error confirming verification code:', error)
      }
    },
    async signIn() {
      try {
        await this.signInUser({
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        this.logoutUser();
        alert('Error signing in, please check console for error detail')
        console.log('error signing in:', error)
      }
    },
    async resendVerificationCode() {
      try {
        await this.resendSignUp({
          email: this.email,
        });
        console.log('code resent successfully');
      } catch (error) {
        alert('Error resending verification code, please check console for error detail')
        console.log('error resending verification code:', error)
      }
    },
    setSignUpStep(step){
      switch(step){
        case 'step2':
          if (!this.name || !this.email || !this.birthdate) {
            return;
          }
          break;
        case 'step4':
          if (this.password.length < 8) {
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