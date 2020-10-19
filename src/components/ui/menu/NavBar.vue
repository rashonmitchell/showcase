<template>
<v-app-bar app :class="{'px-0': $vuetify.breakpoint.xsOnly }">
  <v-layout>
    <v-toolbar flat class="hidden-sm-and-down px-0 mx-0">
      <v-toolbar-items>
        <v-btn 
          text
          id="result"
          class="v-btn v-btn--flat v-btn--router v-btn--text v-size--default"
          :to="{path: '/'}"
          style='cursor: pointer' 
        >
          {{ $t('appname') }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!authenticated">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items class='' v-if="authenticated">
        <!---------------------- DROPDOWN MENU ------------------------->
        <v-menu offset-y transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on }" avatar>
            <v-btn text v-on="on">
              <v-icon  v-if="loggedInUser.photoURL === null" left >person</v-icon>
              <v-avatar v-else size="36">
                <img v-bind:src="loggedInUser.photoURL" >
              </v-avatar>
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
            <LogoutModal></LogoutModal>
          </v-list>
        </v-menu>
        <!-------------------- END DROPDOWN MENU ----------------------->
      </v-toolbar-items>
    </v-toolbar>

    <!---------------------- MOBILE MENU DIALOG ------------------------->
    <v-toolbar flat class="hidden-md-and-up" :class="{'px-0': $vuetify.breakpoint.mdOnly}">
      <v-toolbar-title>
        <v-btn 
          text
          id="result"
          class="pa-0 ma-0 v-btn v-btn--flat v-btn--router v-btn--text v-size--default"
          :to="{path: '/'}"
          style='cursor: pointer' 
        >
          {{ $t('appname') }}
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" class="pa-0 text-xs-right"></v-app-bar-nav-icon>
        </template>
        <v-card>
          <v-toolbar>
            <v-btn 
              text
              id="result"
              class="v-btn v-btn--flat v-btn--router v-btn--text v-size--default"
              :to="{path: '/'}"
              style='cursor: pointer'
              @click.native="dialog = false"
            >
              {{ $t('appname') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false" class="text-xs-left ma-0">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list v-if="!authenticated" @click.native="dialog = false">
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title :title="item.title">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list v-if="authenticated" @click.native="dialog = false">
            <v-list-item>
              <v-list-item-icon avatar>
                <v-icon  v-if="loggedInUser.photoURL === null" left>person</v-icon>
                <v-avatar v-else size="24">
                  <img v-bind:src="loggedInUser.photoURL" >
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ loggedInUser.displayName }}</v-list-item-title>
                <v-divider class="indigo darken-2" dark></v-divider>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-for="(item, index) in menuLoggedIn" :key="item.title" router :to="item.path" text-left>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-divider v-if="item.divider" :key="index" class="indigo darken-2" dark></v-divider>
              </v-list-item-content>
            </v-list-item>
            <LogoutModal></LogoutModal>
          </v-list>
        </v-card>
      </v-dialog>

    </v-toolbar>
    <!-------------------- END MOBILE MENU DIALOG ----------------------->
  </v-layout>
</v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LogoutModal from '../../auth/LogoutModal'
export default {
  components: {
    LogoutModal,
  },
  data() {
    return {
      //v-model="display[item.id]"
      display: {},
      dialog: false,
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
    close(id) {
      this.display[id] = false;
    },
  },
  created() {
    const handler = this.authStateChangeHandler;
    this.$firebase.auth().onAuthStateChanged(user => handler(user));
  },
}
</script>
<style lang="scss">
  .v-toolbar__content, .v-toolbar__extension {
      // padding: 4px 4px !important; 
  }
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