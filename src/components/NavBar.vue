<template>
  <v-app-bar app>
    <v-toolbar-items>
      <router-link 
        text
        class="v-btn v-btn--flat v-btn--router v-btn--text theme--light v-size--default"
        :to="{path: '/'}"
        tag='span'
        style='cursor: pointer' 
        >
        Yogurt
      </router-link>
    </v-toolbar-items>
    <v-spacer></v-spacer>

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
    <v-toolbar-items class='hidden-xs-only' v-if="authenticated">
      <!-- dropdown menu -->
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }" avatar>
          <v-btn text v-on="on">
            <v-avatar v-if="loggedInUser.photo !== null" size="36">
              <img v-bind:src="loggedInUser.photo" >
            </v-avatar>
            <v-icon v-else left>person</v-icon>
              <v-spacer></v-spacer>
            <span ml-5>{{ loggedInUser.displayName }}</span>
            <v-icon right>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menuLoggedIn" :key="item.title" router :to="item.path" text-left>
            <v-spacer></v-spacer>
            <v-icon left>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-divider v-if="item.divider" :key="index" class="indigo darken-2" dark></v-divider>
          </v-list-item>
          <v-list-item  text @click='signOutAction'>
            <v-icon left>logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        { title: 'Sign Up', path: '/register', icon: 'person_add'},
        { title: 'Sign In', path: '/login', icon: 'lock_open' }
     ],
     menuLoggedIn: [
      //  { title: , icon: ''},
       { title: 'Dashboard', path: '/dashboard', icon: 'description', divider: true },
       { title: 'Settings', path: '/settings', icon: 'mdi-account-cog-outline', divider: true },
     ]
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser']),
  },
  methods: {
    ...mapActions('auth', ['authStateChangeHandler', 'signOutAction']),
  },
  created() {
    const handler = this.authStateChangeHandler;
    this.$firebase.auth().onAuthStateChanged(user => handler(user));
  }
}
</script>
<style lang="scss">
  .v-avatar {
    margin-right: 4px;
  }
</style>