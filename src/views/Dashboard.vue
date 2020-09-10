<template>
  <!-- <v-container>
    <v-row class="text-center">
        
    </v-row>
  </v-container> -->
</template>
<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    <AddBtn @yogurtAdded="snackbar = true"/>
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
      <v-col cols="12" sm="8">
        
        <v-row >
          
        </v-row>
        <v-col v-if="authenticated">
            <!-- <p>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</p>
            <h2>{{ loggedInUser.email }}</h2> -->
        </v-col>
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

      </v-col>
      <v-col cols="12" sm="8" >
          <v-card  class="mb-5" elevation="3">
             
          </v-card>
          <!-- <v-data-iterator
            content-tag="v-layout"
            row
            wrap
            v-for="item in userYogurts" :key="item.title"
            :rows-per-page-items="[4]"
          >
            <v-flex
              slot="item"
              xs12
              sm6
              md5
              lg3
            > -->
          <v-card class="cal-item" v-for="item in userYogurts" :key="item.title">
            <v-card-title>
              <h4>{{ item.title }}</h4>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn text icon dark color="red" slot="activator">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Remove from Calendar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn text icon dark color="green" slot="activator">
                  <v-icon>sync</v-icon>
                </v-btn>
                <span>Sync to Google Calendar</span>
              </v-tooltip>
            </v-card-title>
            <v-divider></v-divider>
            <v-list flat>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">mdi-calendar</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.date }}</v-list-tile-content>
                <v-list-tile-content class="align-end">time</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">access_time</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>location</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">subject</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.content }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Attendees:</v-list-tile-title>
                  <template >
                    <v-list-tile-sub-title>{{ user.displayName }}</v-list-tile-sub-title>
                  </template>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        <!-- </v-flex>
      </v-data-iterator> -->
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->


      <!------------------------ PROFILE ----------------------->
      <!-- <v-col cols="12" sm="4">
          <v-card min-height="300" min-width="150" elevation="0" > -->
            <!-- <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader> -->
            <!-- <ProfileNav ></ProfileNav> -->
          <!-- </v-card>
      </v-col> -->
      <!------------------------ END PROFILE ----------------------->

    </v-row>
  </v-container>
</template>

<script>
import AddBtn from '../components/user/ui/AddBtn'
import UserSettingsHeader from '../components/user/settings/UserSettingsHeader'
import ProfileNav from '../components/user/profile/ProfileNav'
import { EventBus } from '../eventbus'
import { db } from '../firebaseinit'
import { mapGetters } from "vuex";
export default {
  name: 'Dashboard',
  components: {
    AddBtn,
    UserSettingsHeader,
    ProfileNav,

  },
  data() {
    return{
      snackbar: false,
      userYogurts: [],
      userYogurtsCopy: [],
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
    // console.log(this.uid, 'this.uid')
    // console.log(this.user.uid, 'this.user.uid')
    let userYogurtRef = db.collection('users/'+this.user.uid+'/user_yogurts')
    // ORDER DATA BY PRIORITY
    //userYogurtRef = userYogurtRef.orderBy("priority", "desc")
    // GET DATA
    userYogurtRef.onSnapshot(res => {

    const changes = res.docChanges();
    changes.forEach(change => {
      if (change.type === 'added') {
        this.userYogurts.push({ // UNSHIF FOR ADD AT THE BEGINNING
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

<style>

</style>
