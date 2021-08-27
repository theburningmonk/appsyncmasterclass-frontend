<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click.prevent="$emit('update:showSetUpProfileModal', false);"></div>

    <div class="modal-main bg-white mx-auto rounded-lg z-50 overflow-y-auto" style="height:60%; width:40%">
      <div class="pl-1 pr-4 py-1 h-12">
        <button v-if="newImage === null || newImage === 'default_profile.png'" 
                @click="$emit('update:showSetUpProfileModal', false);" 
                class="rounded-full bg-white font-bold text-blue mt-2 p-1 px-3 relative right-0 float-right focus:outline-none hover:bg-lightblue">
          Skip for now
        </button>
        <button v-if="newImage !== null && newImage !== 'default_profile.png'" 
                @click="finishSetUpProfile()" 
                class="rounded-full bg-blue font-bold text-white mt-2 p-1 px-4 relative right-0 float-right focus:outline-none hover:bg-darkblue">
          Next
        </button>
        <i class="relative fab fa-twitter text-blue text-2xl mt-2 mb-8" style="margin-left: 50%"></i>
      </div>

      <div class="pt-5 px-8">
        <div class="flex justify-between items-center mb-5">
          <p class="text-2xl font-bold">Pick a profile picture</p>
        </div>
        <p class="text-dark">Have a favorite selfie? Upload it now.</p>

        <div class="mt-16 w-full flex items-center justify-center">
          <div class="fixed">
            <div class="absolute w-32 h-32 rounded-full bg-gray-600 opacity-50"></div>
            <button @click="openFileInput" class="fixed hover:bg-gray-800 p-3 rounded-full ml-10 mt-10">
              <i class="text-2xl fas fa-camera text-white"></i>
              <input @change="fileChange" ref="fileInput" accept="image/jpeg" type="file" class="hidden">
            </button>
            <img class="w-32 h-32 rounded-full" :src="newImage"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "SetUpProfileOverlay",
  props: ["showSetUpProfileModal"],
  data() {
    return {
      newImage: "default_profile.png",
    }
  },
  computed: {
    ...mapGetters('profilePage', [
      'profile', 
    ]),
  },
  methods: {
    ...mapActions('twitter', { 
      editUserProfile: 'editMyProfile',
    }),
    ...mapActions('profilePage', [ 
      'getImageUploadUrl',
      'editMyProfile',
      'loadTweets'
    ]),
    openFileInput() {
      this.$refs.fileInput.click()
    },
    async fileChange() {
      const file = this.$refs.fileInput.files[0];
      const extension = file.name.split('.').pop();
      const contentType = extension === 'png' ? 'image/png' : 'image/jpeg';
      const url = await this.getImageUploadUrl({ extension, contentType });
      const formData = new FormData();
      formData.append("image", file);
      await Axios.put(url, file, { headers: { ['Content-Type']: contentType } });
      this.newImage = url.split('?').shift();
    },
    async finishSetUpProfile() {
      const p = { 
        name: this.profile.name,
        imageUrl: this.newImage
      };
      await Promise.all([
        this.editMyProfile(p),
        this.loadTweets(this.profile.screenName),
        this.editUserProfile(p)
      ]);
      this.$emit('update:showSetUpProfileModal', false);
    },
  },
  created() {
    window.addEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showSetUpProfileModal', false);
    })
  },
  destroyed: function() {
    window.removeEventListener('keyup', () => {
      if (event.keyCode === 27) this.$emit('update:showSetUpProfileModal', false);
    })
  }
}
</script>