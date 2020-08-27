<template>
  <!-- <v-container>
    <v-row class="text-center">
        
    </v-row>
  </v-container> -->
</template>
<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    <v-row>

    <!------------------------ SCREAM LIST ----------------------->
    <v-col cols="12" sm="3" order="-1" order-sm="1">
        <v-card min-height="200" min-width="150" elevation="0" >
          <!-- <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader> -->
          <ProfileNav ></ProfileNav>
        </v-card>
    </v-col>
      
        
    <!------------------------ SCREAM ITEM ----------------------->
    <v-card class="mb-5" elevation="0">
      
    </v-card>
    <!------------------------ END SCREAM ITEM ----------------------->

    <!-- <v-col cols="12" sm="8" >
        <v-card  class="mb-5" elevation="0">
            
        </v-card>
    </v-col> -->
    <!------------------------ END SCREAM LIST ----------------------->


    <!------------------------ PROFILE ----------------------->
    <v-col cols="12" sm="9" order="1" order-sm="2" >
      <v-col v-if="authenticated" class="text-center mb-3 title text-secundario font-weight-bold">
          <span>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</span> 
      </v-col>

      <!-- <UserSettingsMenu /> -->
      <v-card class="pa-4" elevation="1" >
        <v-tabs class="tabs" height="50px" align-with-title v-model="activeTab" slider-color="#32BCC3" color="#32BCC3">
          <v-tab v-for="tab in tabs" :key="tab.index" :to="tab.path" exact color="#32BCC3">
            <v-icon :color='tab.color' left>{{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-card>
    </v-col>
    <!------------------------ END PROFILE ----------------------->

    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserSettingsMenu from '../settings/UserSettingsMenu'
import ProfileNav from '../profile/ProfileNav'
import { mdiLockReset } from '@mdi/js';
export default {
  props: ["index"],
  data() {
    return {
      activeTab: '/settings/',
      tabs: [
        { index: 1, name: "Profile", path: '/settings/', icon: 'mdi-account-edit-outline', color: "green" },
        { index: 2, name: "Password & Security", path: '/settings/password', icon: 'mdi-lock-reset', color: "purple darken-2"   },
        { index: 3, name: "Change Email", path: '/settings/email', icon: 'mdi-email-edit-outline', color: "pink darken-2"   },
        { index: 4, name: "Notfication", path: '/settings/password', icon: 'mdi-bell-outline', color: "blue darken-2"   },
        { index: 5, name: "Daily Yogurt", path: '/settings/email', icon: 'mdi-calendar-month-outline', color: "yellow darken-2"   },
        { index: 6, name: "App Settings", path: '/settings/email', icon: 'mdi-cogs', color: "orange darken-2"   }
      ],
      svg: {
        reset: mdiLockReset,
      }
    };
  },
  mounted() {
     this.activeTab = 1;
   },
  components: {
    ProfileNav,
    UserSettingsMenu
  },
  computed: {
    ...mapState(['userProfile']),
    ...mapGetters('auth', ['authenticated', 'loggedInUser']),
  },
}

// export default {
//   data() {
//     return {
//       name: '',
//       title: '',
//       showSuccess: false
//     }
//   },
  
//   methods: {
//     updateProfile() {
//       this.$store.dispatch('updateProfile', {
//         name: this.name !== '' ? this.name : this.userProfile.name,
//         title: this.title !== '' ? this.title : this.userProfile.title
//       })
//       this.name = ''
//       this.title = ''
//       this.showSuccess = true
//       setTimeout(() => {
//         this.showSuccess = false
//       }, 2000)
//     }
//   }
// }
</script>

<style>

</style>