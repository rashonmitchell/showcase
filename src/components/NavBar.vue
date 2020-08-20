<template>
  <v-app-bar app>
    <v-toolbar-items>
      <v-btn 
        text
        id="result"
        class="v-btn v-btn--flat v-btn--router v-btn--text theme--light v-size--default"
        :to="{path: '/'}"
        tag='span'
        style='cursor: pointer' 
        >
        {{ $t('appname') }}
      </v-btn>
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
    <v-toolbar-items class='' v-if="authenticated">
      <!-- dropdown menu -->
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }" avatar>
          <v-btn text v-on="on">
            <v-icon  v-if="loggedInUser.photo === null" left >person</v-icon>
            <v-avatar v-else size="36">
              <img v-bind:src="loggedInUser.photo" >
            </v-avatar>
            <!-- <v-avatar v-if="loggedInUser.photo !== null" size="36">
              <img v-bind:src="loggedInUser.photo" >
            </v-avatar>
            <v-icon v-else left>person</v-icon> -->
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
          <!-- <v-list-item  text @click='signOutAction'>
            <v-icon left>logout</v-icon>
            <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
          </v-list-item> -->
           <LogoutModal ></LogoutModal>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-btn text><LocaleChanger /></v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon @click="toggleThemeDarkMode">
          <v-icon :style="{transform: `rotate(${$vuetify.theme.dark ? 0 : -190 }deg)`}">
            {{ icons.mdiThemeLightDark }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t(($vuetify.theme.dark ? 'light' : 'dark') + 'Mode') }}</span>
     </v-tooltip>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { mdiThemeLightDark } from '@mdi/js'
import LocaleChanger from '../components/LocaleChanger'
import LogoutModal from '../components/auth/LogoutModal'
export default {
  components: {
    LocaleChanger,
    LogoutModal
  },
  data() {
    return {
      icons: { mdiThemeLightDark }, 
      //appTitle: 'Awesome App',
      menuItems: [
        { title: `${this.$t('signUp')}`, path: '/register', icon: 'person_add'},
        { title: `${this.$t('signIn')}`, path: '/login', icon: 'lock_open' }
     ],
     menuLoggedIn: [
       { title: `${this.$t('dashboard')}`, path: '/dashboard', icon: 'description', divider: true },
       { title: `${this.$t('settings')}`, path: '/settings', icon: 'mdi-account-cog-outline', divider: true },
     ]
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser']),
  },
  methods: {
    ...mapActions('auth', ['authStateChangeHandler', 'signOutAction']),
    toggleThemeDarkMode () {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  },
  },
  created() {
    const handler = this.authStateChangeHandler;
    this.$firebase.auth().onAuthStateChanged(user => handler(user));
  },
}
</script>
<style lang="scss">
  #result .v-btn::before{
    background-color: transparent;
  }
  #result.v-btn--active::before {
    opacity: 0;
  }
  .v-avatar {
    margin-right: 4px;
  }
</style>