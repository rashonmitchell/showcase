<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    <!------------------------ PROFILE NAME ----------------------->
    <v-row>
      <v-col v-if="authenticated" class="text-center mb-3 title text-secundario font-weight-bold">
          <!-- <v-banner sticky> -->
            <span>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</span>
          <!-- </v-banner> -->
      </v-col>
    </v-row>
    <v-row>
    <!------------------------ END PROFILE NAME ----------------------->

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


    <!------------------------ PROFILE TABS ----------------------->
    <v-col cols="12" sm="9" order="1" order-sm="2" >
      <UserSettingsMenu />
    </v-col>
    <!------------------------ END PROFILE TABS ----------------------->

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
      svg: {
        reset: mdiLockReset,
      }
    };
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