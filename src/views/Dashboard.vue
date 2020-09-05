<template>
  <!-- <v-container>
    <v-row class="text-center">
        
    </v-row>
  </v-container> -->
</template>
<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    <AddBtn />
    <UserSettingsHeader />
    <v-row>

      <!------------------------ SCREAM LIST ----------------------->
      <v-col cols="12" sm="8" >
        <v-col v-if="authenticated">
            <!-- <p>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</p>
            <h2>{{ loggedInUser.email }}</h2> -->
        </v-col>
          <!------------------------ SCREAM ITEM ----------------------->
          <v-card class="mb-5" >
            <!-- <div 
              :height=180
              :width=500
              :speed=2
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb">hahaha</div> -->
          </v-card>
          <!------------------------ END SCREAM ITEM ----------------------->

      </v-col>
      <v-col cols="12" sm="8" >
          <v-card  class="mb-5" elevation="3">
             
          </v-card>
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
import { mapGetters } from "vuex";
export default {
  name: 'Dashboard',
  components: {
    AddBtn,
    UserSettingsHeader,
    ProfileNav,
  },
  // data: function(){

  // },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser', 'user']),
  },

}
</script>

<style>

</style>
