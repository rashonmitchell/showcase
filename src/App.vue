<template>
  <v-app>
    <!-- <LoadingScreen :isLoading="isLoading" />
    <v-main v-if="!isLoading"> -->
    <v-main>
      <!-- display nav bar -->
      <nav-bar></nav-bar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import LoadingScreen from "./components/LoadingScreen";
import NavBar from './components/user/ui/NavBar';

export default {
  name: 'App',
  data: function(){
    return {
      isLoading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  },
  components: {
    LoadingScreen,
    NavBar,
  },
};
</script>
<style lang="scss">
@import './src/assets/scss/main.scss';
</style>
