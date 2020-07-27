<template>
    <!-- display the navigation bar -->
    <v-app-bar app>
      <v-toolbar-items>
        <v-btn
        text
            tag='span'
            style='cursor: pointer'
            >
          SHOW CASE
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
<!-- navigation bar links -->
      <v-toolbar-items class='hidden-xs-only'>
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
      <!-- <v-toolbar-items class='hidden-xs-only'>
        <v-btn
        text
          >
          <v-icon right>delete_sweep</v-icon>Logout
        </v-btn>
      </v-toolbar-items> -->
    </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Sign Up', path: '/register', icon: 'face' },
          { title: 'Sign In', path: '/login', icon: 'lock_open' }
     ]
    }
  }
}
</script>