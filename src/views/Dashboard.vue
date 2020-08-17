<template>
  <v-row>
      <v-col v-if="authenticated">
          <h1>dashboard</h1>
         <h2>
           
          {{ loggedInUser.email }}
          </h2> 
          <p>{{ loggedInUser.displayName }}</p>
      </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // data: function(){

  // },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser']),
  },

}
</script>

<style>

</style>
