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
      <v-col cols="12" sm="8" order="1" order-sm="1">
        <v-col v-if="authenticated">
            <h1>settings</h1> 
            <p>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</p>
            <h2>{{ loggedInUser.email }}</h2>
        </v-col>
          <!------------------------ SCREAM ITEM ----------------------->
          <v-card class="mb-5" elevation="0">
            
          </v-card>
          <!------------------------ END SCREAM ITEM ----------------------->

      </v-col>
      <!-- <v-col cols="12" sm="8" >
          <v-card  class="mb-5" elevation="0">
              
          </v-card>
      </v-col> -->
      <!------------------------ END SCREAM LIST ----------------------->


      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="4" order="-1" order-sm="2" >
          <v-card min-height="300" min-width="150" elevation="0" >
            <!-- <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader> -->
            <ProfileNav ></ProfileNav>
          </v-card>
      </v-col>
      <!------------------------ END PROFILE ----------------------->

    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProfileNav from '../profile/ProfileNav'
export default {
  components: {
    ProfileNav,
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