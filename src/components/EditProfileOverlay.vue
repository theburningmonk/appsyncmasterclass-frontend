<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class="modal-main bg-white mx-auto rounded-lg z-50 overflow-y-auto" style="height:65%; width:40%">
      <div class="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
        <button @click="saveProfile()" 
                class="rounded-full bg-blue font-bold text-white mt-2 p-1 px-4 relative right-0 float-right focus:outline-none hover:bg-darkblue">
          Save
        </button>
        <div class="flex flex-row mt-1 ml-4">
          <i @click="$emit('update:showEditProfileModal', false);" class="fas fa-times text-blue text-2xl mb-8 mr-6 rounded-full bg-white p-2 px-3 hover:bg-lightblue"></i>
          <p class="text-xl pt-1 font-bold">Edit profile</p>
        </div>
      </div>

      <div class="border-l-2 border-r-2 border-white">
        <!-- background image -->
        <div class="relative" style="height:200px; display:block">
          <!-- change background overlay -->
          <div class="absolute w-full max-w-full h-full max-h-full bg-gray-600 opacity-50"></div>
          <button @click="openFileInput('backgroundFileInput')" 
                  class="absolute hover:bg-gray-800 p-3 rounded-full"
                  style="margin-left: 45%; margin-top: 80px">
              <i class="text-2xl fas fa-camera text-white"></i>
              <input @change="fileChange('backgroundFileInput', 'backgroundImageUrl')" ref="backgroundFileInput" accept="image/jpeg" type="file" class="hidden">
          </button>

          <div v-if="backgroundImageUrl" class="h-full max-h-full">
            <img :src="backgroundImageUrl" class="h-full w-full object-cover"/>
          </div>
          <div v-if="!backgroundImageUrl" class="bg-gray-400 h-full max-h-full"></div>
        </div>

        <div class="p-3 flex flex-col">
          <!-- profile image -->
          <div style="margin-top:-80px" class="relative w-32 h-32 rounded-full mb-6">
            <div class="absolute w-32 h-32 rounded-full bg-gray-600 opacity-50 border-4 border-white"></div>
            <button @click="openFileInput('imageUrlFileInput')" class="absolute hover:bg-gray-800 p-3 rounded-full ml-10 mt-10">
              <i class="text-2xl fas fa-camera text-white"></i>
              <input @change="fileChange('imageUrlFileInput', 'imageUrl')" ref="imageUrlFileInput" accept="image/jpeg" type="file" class="hidden">
            </button>

            <img :src="imageUrl" class="w-32 h-32 rounded-full border-4 border-white"/>
          </div>

          <div class="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
            <label class="text-dark">Name</label>
            <input v-model="name" class="w-full bg-lightest text-lg focus:outline-none" type="text">            
          </div>
          <div class="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
            <label class="text-dark">Bio</label>
            <textarea v-model="bio" class="w-full bg-lightest text-lg focus:outline-none" type="text"
                   placeholder="Add your bio"/>
          </div>
          <div class="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
            <label class="text-dark">Location</label>
            <input v-model="location" class="w-full bg-lightest text-lg focus:outline-none" type="text"
                   placeholder="Add your location">            
          </div>
          <div class="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
            <label class="text-dark">Website</label>
            <input v-model="website" class="w-full bg-lightest text-lg focus:outline-none" type="text"
                   placeholder="Add your website">            
          </div>
          <div class="w-full bg-lightest border-b-2 border-dark mb-24 py-1 px-3">
            <label class="text-dark">Birth date</label>
            <input v-model="birthdate" class="w-full bg-lightest text-lg focus:outline-none" type="text"
                   placeholder="Add your birth date (Eg: 2020-01-31)">            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "SetUpProfileOverlay",
  props: ["showEditProfileModal"],
  data() {
    return {
      name: undefined,
      backgroundImageUrl: undefined,
      imageUrl: undefined,
      bio: undefined,
      location: undefined,
      website: undefined,
      birthdate: undefined
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
      'loadProfile',
      'loadTweets'
    ]),
    openFileInput(ref) {
      this.$refs[ref].click()
    },
    async fileChange(ref, prop) {
      const file = this.$refs[ref].files[0];
      const extension = file.name.split('.').pop();
      const contentType = extension === 'png' ? 'image/png' : 'image/jpeg';
      const url = await this.getImageUploadUrl(extension, contentType);
      const formData = new FormData();
      formData.append("image", file);
      await Axios.put(url, file, { headers: { ['Content-Type']: contentType } });
      this[prop] = url.split('?').shift();
    },
    async saveProfile() {
      const p = {
        name: this.name,
        imageUrl: this.imageUrl,
        backgroundImageUrl: this.backgroundImageUrl,
        bio: this.bio,
        location: this.location,
        website: this.website,
        birthdate: moment(this.birthdate, "YYYY-MM-DD").format("YYYY-MM-DD")
      };
      const newProfile = await this.editMyProfile(p)
      await Promise.all([
        this.loadProfile(newProfile.screenName),
        this.loadTweets(newProfile.screenName),
        this.editUserProfile(p)
      ]);
      this.backgroundImageUrl = newProfile.backgroundImageUrl;
      this.imageUrl = newProfile.imageUrl;
      this.$emit('update:showEditProfileModal', false);
    },
  },
  created() {
    this.name = this.profile.name;
    this.backgroundImageUrl = this.profile.backgroundImageUrl;
    this.imageUrl = this.profile.imageUrl;
    this.bio = this.profile.bio;
    this.location = this.profile.location;
    this.website = this.profile.website;
    this.birthdate = this.profile.birthdate;
  },
}
</script>