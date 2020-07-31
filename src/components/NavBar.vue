<template>
    <!-- display the navigation bar -->
    <v-app-bar app>
      <v-toolbar-items>
        <!-- <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link> -->
        <router-link 
          text
          class="v-btn v-btn--flat v-btn--router v-btn--text theme--light v-size--default"
          :to="{name: 'Home'}"
          tag='span'
          style='cursor: pointer' 
          >
          Yogurt
        </router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>
<!-- navigation bar links -->
      <v-toolbar-items class='hidden-xs-only' v-if="!authenticated">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <!-- sign out button -->
      <v-toolbar-items class='hidden-xs-only' v-if="authenticated">
        <v-btn
          text
          v-for="item in menuLoggedIn"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          text
          @click='signOutAction'
        >
          <v-icon left dark>logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      //appTitle: 'Awesome App',
      menuItems: [
        { title: 'Sign Up', path: '/register', icon: 'person_add' },
        { title: 'Sign In', path: '/login', icon: 'lock_open' }
     ],
     menuLoggedIn: [
       { title: 'Dashboard', path: '/dashboard', icon: 'description' },
       { title: 'Settings', path: '/settings', icon: 'person' },
     ]
    }
  },
  computed: {
    // userLogedIn () {
    //   //console.log(this.$store.state.user.email, 'this is the user')
    //   return this.$store.getters.user
    // }
    ...mapGetters("auth", ["authenticated"])
  },
  methods: {
    ...mapActions("auth", ["authStateChangeHandler", "signOutAction"]),
    // logout () {
    //   this.$store.dispatch('signOutAction')
    // }
  },
  created() {
    const handler = this.authStateChangeHandler;
    this.$firebase.auth().onAuthStateChanged(user => handler(user));
  }
}
</script>