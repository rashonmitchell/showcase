<template>
  <v-card class="pa-4" outlined >
    <v-tabs class="tabs" height="50px" align-with-title v-model="activeTab" slider-color="#32BCC3" color="#32BCC3">
      <v-divider></v-divider>
      <v-tab v-for="tab in tabs" :key="tab.index" :to="tab.path" exact color="#32BCC3">
        <v-icon :color='tab.color' left>{{ tab.icon }}</v-icon>
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-card>
</template>
<script>
  export default {
    props: ["id"],
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
        ]
      };
    },
  }
</script>

<style lang="scss">
  .text-color{
    color: red;
  }
  .active {
    color: #42b983;
  }
  // .b-link .text-info:active {
  //   color: #42b983 !important;
    
  //   &.active {
  //     color: #42b983;
  //   }
  //}
</style>
