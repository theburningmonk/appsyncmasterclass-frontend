<template>
  <div id="app" class="flex container h-full w-full">
    <div class="flex container h-full w-full">
      <SideNav/>

      <div class="w-full sm:w-1/3 md:w-1/2 lg:w-1/2 h-full overflow-y-scroll hidden md:block">
        <div class="px-5 py-3 border-b border-lighter flex" @click="deselectAll()">
          <h1 class="text-xl font-bold flex-1">Messages</h1>
          <i class="fas fa-cog text-xl text-blue cursor-pointer"></i>
          <i @click="newMessage()" class="fas fa-plus-circle ml-3 text-xl text-blue cursor-pointer"></i>
        </div>

        <!-- conversations -->
        <Loader :loading="loading" />
        <div v-if="!loading">
          <div v-if="conversations.length === 0" class="flex flex-col items-center justify-center w-full pt-10">
            <div class="w-1/2 flex flex-col items-center justify-center">
              <p class="font-bold text-lg">No conversations yet</p>
              <p class="text-sm text-dark">Wait until someone starts a conversation here.</p>
            </div>
          </div>
          <div v-for="conversation in conversations" :key="conversation.id+conversation.lastMessage">
            <div class="cursor-pointer" :class="(active && conversation.id == active.id)?'border-r-2 border-blue':''">
              <div class="w-full p-2 pt-1 pb-1 md:p-4 md:pt-2 md:pb-2 border-b hover:bg-lightest flex" :style="hasNewMessages(conversation)?'background-color:#e1f5fe;':''" @click="selectConversation(conversation)">
                <div class="flex-none mr-2 md:mr-4 pt-1">
                  <a :href="`#/${conversation.otherUser.screenName}`">
                    <img :src="`${conversation.otherUser.imageUrl || 'default_profile.png'}`" class="h-12 w-12 rounded-full flex-none" loading="lazy"/>
                  </a>
                </div>
                <div class="w-full truncate">
                  <div class="flex items-center w-full">
                    <p class="font-semibold">{{ conversation.otherUser.name }}</p>
                    <p class="hidden md:block text-sm text-dark ml-2 truncate">@{{ conversation.otherUser.screenName }}</p>
                    <p class="text-sm text-dark ml-auto">{{ conversation.lastModified | timeago }}</p>
                  </div>

                  <p class="pb-2 truncate" v-linkify>
                    {{ conversation.lastMessage }}
                  </p>
                </div>
              </div>
            </div>              
          </div>
        </div>  
      </div>

      <div v-if="loading || !active" 
        class="w-full z-0 h-screen border-l border-r border-lighter overflow-y-scroll relative flex flex-col items-center justify-center"
        style="display: grid; grid-template-rows: 53px auto"
      >
        <div class="top-0 left-0 w-full px-5 pt-1 pb-2 border-lighter flex bg-white" :class="!active?'':'border-b'">        
          <button @click="gotoHome()" class="block md:hidden rounded-full mr-2 focus:outline-none hover:bg-lightblue">
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <div class="w-3/5">
            <p class="font-bold text-lg">You don’t have a message selected</p>
            <p class="text-sm text-dark">This is where you’ll see messages from people you don’t follow. They won’t know you’ve seen the request until you accept it.</p>
            <div class="flex justify-start mt-5">        
              <button @click="newMessage()" type="button" 
                class="h-10 px-2 text-white font-semibold bg-blue hover:bg-darkblue rounded-full">
                  New Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loading && active" 
        class="w-full border-l border-r border-lighter h-screen" 
        style="display: grid; grid-template-rows: 53px auto 53px;"
      >
        <div class="px-5 pt-1 pb-2 border-b border-lighter flex bg-white sticky" @click="deselectAll(); active = undefined;">        
          <button @click="gotoHome()" class="block md:hidden rounded-full mr-2 focus:outline-none hover:bg-lightblue">
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
          <div class="flex-none mr-4">            
            <a :href="`#/${active.otherUser.screenName}`">
              <img :src="`${active.otherUser.imageUrl || 'default_profile.png'}`" class="flex-none w-6 h-6 rounded-full mt-2" loading="lazy"/>
            </a>
          </div>
          <div class="w-full flex flex-col">
            <h1 class="text-m font-bold flex-1">{{ active.otherUser.name }}</h1>
            <p class="text-dark text-xs">@{{ active.otherUser.screenName }}</p>
          </div>
          <i class="fas fa-info-circle ml-3 text-xl text-blue mt-2 cursor-pointer"></i>
        </div>

        <div class="w-full pt-5 overflow-y-scroll" style="display: grid; grid-template-rows: auto" v-scroll:top="loadMore">
          <div class="w-full px-5 flex flex-col justify-between">
            <div class="flex flex-col-reverse mt-1 h-full" style="min-height: 100%;">
              <div ref="scrollToMe"></div>
              <div v-for="message in messages" :key="message.id">
                <!-- Me -->
                <div v-if="isMyMessage(message.from.screenName)">
                  <div class="flex justify-end">
                    <div class="mr-2 py-3 px-4 bg-blue rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      {{message.message}}
                    </div>
                  </div>
                  <div class="flex justify-end w-full mb-4">
                    <p class="text-xs text-dark mr-2">{{ message.timestamp | time }}</p>
                  </div>
                </div>
                <!-- Other -->
                <div v-if="!isMyMessage(message.from.screenName)">
                  <div class="flex justify-start">
                    <div class="flex-none mr-4">
                      <a :href="`#/${message.from.screenName}`">
                        <img :src="`${message.from.imageUrl || 'default_profile.png'}`" class="object-cover h-8 w-8 rounded-full self-end" loading="lazy"/>
                      </a>
                    </div>
                    <div class="ml-2 py-3 px-4 bg-lighter rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                      {{message.message}}
                    </div>
                  </div>
                  <div class="flex items-center w-full mb-4">
                    <p class="text-xs text-dark ml-14">{{ message.timestamp  | time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white px-5 p-3 border-t border-lighter flex w-full">
          <input ref="input" class="pl-5 rounded-full w-full p-2 bg-lighter text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue" 
            placeholder="Start a new message" type="search"
            v-model="message"
            v-on:keyup.enter="sendMessage()"
            :disabled="disabled"
          />
          <button class="rounded-full focus:outline-none right-4 ml-4 w-8 h-8" 
            :class="`${message.length == 0 ? 'opacity-50 cursor-default' : 'hover:bg-lightblue'}`"
            @click="sendMessage()"
            :disabled="disabled"
          >
            <i class="fas fa-arrow-right text-xl text-blue"></i>
          </button>
        </div>
      </div>

      <NewMessageOverlay 
        v-if="showNewMessageModal" 
        :showNewMessageModal.sync="showNewMessageModal"
        @selected="selected"
      />
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import Loader from '../components/Loader.vue'
import NewMessageOverlay from '../components/NewMessageOverlay.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Messages',
  components: {
    SideNav,
    Loader,
    NewMessageOverlay,
  },
  data() {
    return {
      loading: true,
      message: '',
      disabled: false,
      showNewMessageModal: false,
      lastNextToken: undefined,
    }
  },
  computed: {
    ...mapGetters('twitter', {
      isMyMessage: 'isSelf',
      active: 'conversation',
      userProfile: 'profile', 
    }),
    ...mapGetters('twitter', [
      'conversations',
      'messages',
      'hasNewMessages',
      'nextTokenMessages'
    ]),
    ...mapGetters('profilePage', [
      'profile', 
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUserIfAlreadyAuthenticated', 
    ]),
    ...mapActions('twitter', [
      'loadConversations',
      'getDirectMessages',
      'sendDirectMessage',
      'setActiveConversation',
      'loadMoreDirectMessages',
    ]),
    ...mapActions('profilePage', [
      'loadProfile',
    ]),
    newMessage() {
      this.showNewMessageModal = true
    },
    gotoHome() {
      this.$router.push({
        name: 'Home',
      })
    },
    async selectConversation(conversation) {
      this.setActiveConversation(conversation)
      await this.getDirectMessages({ 
        otherUserId: conversation.otherUser.id,
        limit: 10,
      });
      this.scrollToEnd();
    },
    sendMessage() {
      if (!this.active.otherUser.id || this.message.length == 0) 
        return;
      this.disabled = true; //disable message input temporarly
      this.sendDirectMessage({
        message: this.message,
        otherUserId: this.active.otherUser.id,
      }).then(()=> {
        this.message = ''
        this.disabled = false;
        this.$nextTick(() => {
          this.scrollToEnd();
        })
      });
    },
    scrollToEnd() {
      this.$nextTick(() => {
        const el = this.$refs.scrollToMe;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => this.$refs.input.focus(), 500);
      });
    },
    async selected(user) {
      if (!this.userProfile.id || !user.id) {
        return;
      }
      this.showNewMessageModal = false;
      const conversationId = `${this.userProfile.id}_${user.id}`;
      const conversationIdReversed = `${user.id}_${this.userProfile.id}`;
      let existingConversation = undefined;
      this.conversations.forEach(conversation => {
        if (conversation.id == conversationId ||
          conversation.id == conversationIdReversed 
        ) {
          existingConversation = conversation;
        }
      });
      if (existingConversation) {
        await this.selectConversation(existingConversation);
      } else {
        let newConversation = {
          id: conversationId,
          lastMessage: undefined,
          lastModified: undefined,
          otherUser: { ...user }
        };
        this.setActiveConversation(newConversation);
        await this.selectConversation(newConversation);
      }
    },
    deselectAll() {
      this.setActiveConversation(undefined);
    },
    async loadMore() {
      if (!this.active) return;
      console.log('loading...');
      await this.loadMoreDirectMessages({ 
        otherUserId: this.active.otherUser.id,
        limit: 10
      }).catch(error => {
        console.log(error);
      })
    }
  },
  async created() {
    if (this.conversations.length >0) this.loading = false;
    if (this.conversation) this.scrollToEnd();
    await this.loginUserIfAlreadyAuthenticated();
    await this.loadConversations(10).then(() => this.loading = false);
    if (this.profile.id != this.userProfile.id) {
      // handling sending direct message from profile page
      await this.selected(this.profile);
    }
  },
}
</script>