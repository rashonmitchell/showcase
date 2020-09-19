<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    
    <UserSettingsHeader />

    <v-snackbar v-model="snackbar" :timeout="6000" top color="#42b883">
      <span>Awesome! You successfully added a new yogurt.</span>
      <v-btn text color="white" @click="snackbar = false">CLOSE</v-btn>
    </v-snackbar>
    
    <v-row justify-center v-if="this.userYogurts.length == 0" class="my-8">
      <v-layout column align-center>
        <span :class="{'grey--text display-3': $vuetify.breakpoint.smAndUp, 'display-1 grey--text': $vuetify.breakpoint.xsOnly}">No yogurts yet! 😔</span>
        <v-btn text color="#42b983" class="display-1 my-8" @click="openDialog">Create a yogurt</v-btn>
      </v-layout>
    </v-row>

    <v-row>
      <!------------------------ SCREAM LIST ----------------------->
      <v-col cols="12" sm="8" order="-1" order-sm="1" >
        <v-container fluid grid-list-xl class="card-container">
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 v-for="item in userYogurts" :key="item.title" >
              <v-card class="flex-grow-1 cal-item">
                <v-card-title primary class="cal-item-title">
                  <h4>{{ item.title }}</h4>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn text icon dark color="red" v-on="on" >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove from Calendar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn text icon dark color="green" v-on="on" >
                      <v-icon>sync</v-icon>
                    </v-btn>
                  </template>
                  <span>Sync to Google Calendar</span>
                </v-tooltip>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item class="cal-item-list-tile">
                    <v-list-item-action class="cal-item-list-tile-action">
                      <v-icon color="indigo">mdi-calendar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>{{ item.date }}</v-list-item-content>
                    <!-- <v-list-item-content class="align-end">17:00 - 18:00</v-list-item-content> -->
                  </v-list-item>
                  <v-list-item class="cal-item-list-tile">
                    <v-list-item-action class="cal-item-list-tile-action">
                      <v-icon color="indigo">access_time</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>17:00 - 18:00</v-list-item-content>
                  </v-list-item>
                  <v-list-item class="cal-item-list-tile">
                    <v-list-item-action class="cal-item-list-tile-action">
                      <v-icon color="indigo">subject</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>{{ item.content }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item class="cal-item-list-tile">
                    <v-list-item-action class="cal-item-list-tile-action">
                      <v-icon color="indigo">group</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Attendees:</v-list-item-title>
                      <template >
                        <v-list-item-subtitle>{{ user.displayName }}</v-list-item-subtitle>
                      </template>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <!-- <div class="overflow-hidden">
                  <div class="text-center mb-2">
                    <v-btn
                      text
                      color="deep-purple"
                      @click="showNav = !showNav"
                    >
                      Toggle Nav
                    </v-btn>
                  </div>

                  <v-bottom-navigation
                    v-model="activeBtn"
                    :input-value="showNav"
                    color="indigo"
                  >
                    <v-btn>
                      <span>Recents</span>
                      <v-icon>mdi-history</v-icon>
                    </v-btn>

                    <v-btn>
                      <span>Favorites</span>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn>
                      <span>Nearby</span>
                      <v-icon>mdi-map-marker</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </div> -->
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-row align="center" justify="end">
                      <!---------------------- PLAY YOGURT ------------------------->
                      <PlayYogurt></PlayYogurt>
                      <v-spacer></v-spacer>
                      <!--------------------- END PLAY YOGURT ---------------------->

                      <!-- <v-btn text>{{$t('read')}}</v-btn>
                      <v-btn text>{{$t('bookmark')}}</v-btn>
                      <v-spacer></v-spacer> -->

                      <!---------------------- LIKED BUTTON ------------------------->
                      <LikedBtn></LikedBtn>
                      <!-- todo # add count of share...maybe? do you really need the count? -->
                      <span class="subheading mr-2">256</span>
                      <!--------------------- END LIKED BUTTON ---------------------->

                      <!---------------------- SHARE DIALOG ------------------------->
                      <ShareBtnDialog></ShareBtnDialog>

                      <!-- todo # add count of share...maybe? do you really need the count? -->
                      <span class="subheading">45</span>
                      <!--------------------- END SHARE DIALOG ----------------------->
                    </v-row>
                    
                  </v-list-item>
                </v-card-actions>
                <!-- <v-card-actions>
                  <v-btn text>Share</v-btn>
                  <v-btn
                    color="purple"
                    text
                  >
                    Explore
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="show = !show"
                  >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition> -->
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-col>
      
      <!-- <v-col v-if="authenticated">
          <p>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</p>
          <h2>{{ loggedInUser.email }}</h2>
      </v-col> -->
      <!------------------------ SCREAM ITEM ----------------------->
      <!-- <v-card class="mb-5" v-for="userYogurt in userYogurts" :key="userYogurt.title">
        {{ userYogurt }} -->
        <!-- <div 
          :height=180
          :width=500
          :speed=2
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb">hahaha</div> -->
      <!-- </v-card> -->
      <!------------------------ END SCREAM ITEM ----------------------->
      <!-- <v-col cols="12" sm="8">
        <v-card  class="mb-5" elevation="3">
        </v-card>
      </v-col> -->
      <!------------------------ END SCREAM LIST ----------------------->


      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="3" order="1" order-sm="1" >
        <v-card min-height="300" min-width="150" elevation="0" >
          <!-- <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader> -->
          <ProfileNav></ProfileNav>
        </v-card>
      </v-col>
      <!------------------------ END PROFILE ----------------------->
      <CreateYogurtDialog @yogurtAdded="snackbar = true"/>
    </v-row>
  </v-container>
</template>

<script>
import CreateYogurtDialog from '../components/user/ui/CreateYogurtDialog'
import UserSettingsHeader from '../components/user/settings/UserSettingsHeader'
import ProfileNav from '../components/user/profile/ProfileNav'

import PlayYogurt from '../components/user/ui/PlayYogurt'
import LikedBtn from '../components/user/ui/LikedBtn'
import ShareBtnDialog from '../components/user/ui/ShareBtnDialog'
import { EventBus } from '../eventbus'
import { db } from '../firebaseinit'
import { mapGetters } from "vuex";
export default {
  name: 'Dashboard',
  components: {
    CreateYogurtDialog,
    UserSettingsHeader,
    ProfileNav,
    PlayYogurt,
    LikedBtn,
    ShareBtnDialog,
  },
  data() {
    return{
      snackbar: false,
      userYogurts: [],
      userYogurtsCopy: [],
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      activeBtn: 1,
      showNav: true,
      show: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser', 'user']),
  },
  methods: {
    openDialog() {
      EventBus.$emit('dialog', true)
    },
  },
  created() {
    // db.collection('users/'+this.uid+'/users-yogurts').onSnapshot(snapshot => {
    //       const snapData = [];
    //       snapshot.forEach( doc => {
    //         snapData.push({
    //           id: doc.id,
    //           title: doc.data().title
              
    //         });
    //       });
    //       });
    let userYogurtRef = db.collection('users/'+this.user.uid+'/user_yogurts')
    // ORDER DATA BY PRIORITY
    //userYogurtRef = userYogurtRef.orderBy("priority", "desc")
    // GET DATA
    userYogurtRef.onSnapshot(res => {
    const changes = res.docChanges();

    changes.forEach(change => {
      let source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
      //console.log(source, " data: ", change.doc.data());

      if (change.type === 'added') {
        this.userYogurts.unshift({ // UNSHIF FOR ADD AT THE BEGINNING
          ...change.doc.data(),
          id: change.doc.id
          })
        }
      })
    })
    this.userYogurtsCopy = this.userYogurts
  }
}
</script>

<style lang="scss" scoped>
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0px !important; 
}
.card-container {
  // padding: 0 12px 12px 0;
}
.cal-item .btn {
  margin: 0 5px;
  height: 28px;
  width: 28px;
}
.cal-item .btn i {
  font-size: 22px;  
}
.cal-item-title {
  padding: 16px 16px
}
.cal-item-list-tile {
  height: unset!important;
  padding: 5px 10px;
}
.cal-item-list-tile-action {
  align-self: flex-start;
  min-width: unset;
  padding-right: 16px;
}
.cal-item .color-2 {
  background-color: #F44336;
}
</style>
