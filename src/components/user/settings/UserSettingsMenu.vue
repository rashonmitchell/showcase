<template>
  <v-card class="pa-4" elevation="1" >
    <v-tabs class="tabs" height="50px" align-with-title v-model="activeTab" slider-color="#32BCC3" color="#32BCC3">
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
        activeTab: '',
        tabs: [
          { id: 1, name: "Profile Password", route: '../profile/UserProfilePassword' },
          { id: 2, name: "Profile Email", route: '../profile/UserProfileEmail' }
        ]
      };
    }
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
