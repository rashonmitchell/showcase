<template>
  <v-container fluid>
    <CreateYogurtDialog></CreateYogurtDialog>
    <v-layout row wrap class="text-center">
      <v-flex xs12  mt-5>
        <h1> {{ $t('tagLine') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          Our culture is built one thought at a time.<br>
        </blockquote>
      </v-flex>
      <!-- <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
      </v-flex> -->
    </v-layout>

    <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="600"
    >
      <v-card-title class="sticky-header elevation-1">
        <v-icon class="mr-2">calendar_today</v-icon>
        <div>{{$t('yogurtOfTheDay')}}</div>
      </v-card-title>

      <v-card-text class="headline font-weight-bold my-2">
        " Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-text>
      <v-divider color="#212121" class="ma-3"></v-divider>
      <v-card-actions>
        <v-list-item class="grow">
          <v-row align="center" justify="end">
            <!---------------------- PLAY BUTTON ------------------------->
            <PlayBtn></PlayBtn>
            <v-spacer></v-spacer>
            <!--------------------- END PLAY BUTTON ---------------------->
            <!-- <v-btn text>{{$t('read')}}</v-btn> -->
            <v-spacer></v-spacer>
            <!---------------------- LIKED BUTTON ------------------------->
            <BookmarkBtn></BookmarkBtn>
             <span class="subheading mr-3"></span>
            <!-- todo # add count of bookmarked...maybe? do you really need the count? but this should go to a Bookmarked section on dashboard. -->
            <!-- <v-btn text>{{$t('bookmark')}}</v-btn> -->
            <!--------------------- END LIKED BUTTON ---------------------->

            <!---------------------- LIKED BUTTON ------------------------->
            <Comment></Comment>
            <!-- todo # add count of share...maybe? do you really need the count? -->
            <span class="subheading mr-2">10</span>
            <!--------------------- END LIKED BUTTON ---------------------->

            <!---------------------- LIKED BUTTON ------------------------->
            <LikedBtn></LikedBtn>
            <!-- todo # add count of share...maybe? do you really need the count? -->
            <span class="subheading mr-2">256</span>
            <!--------------------- END LIKED BUTTON ---------------------->

            <!---------------------- SHARE DIALOG ------------------------->
            <ShareBtnDialog></ShareBtnDialog>
            <!-- todo # add count of share...maybe? do you really need the count? -->
            <span class="subheading">45</span>
            <!--------------------- END SHARE DIALOG ----------------------->
            
          </v-row>
          
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>

</template>
<script>
import CreateYogurtDialog from '../components/ui/CreateYogurtDialog'
//import AddBtnDialog from '../components/user/ui/AddBtnDialog'

import BookmarkBtn from '../components/ui/buttons/BookmarkBtn'
import Comment from '../components/ui/comment/Comment'
import PlayBtn from '../components/ui/buttons/PlayBtn'
import LikedBtn from '../components/ui/buttons/LikedBtn'
import ShareBtnDialog from '../components/ui/ShareBtnDialog'
export default {
  name: "Home",
  components: {
    CreateYogurtDialog,
    BookmarkBtn,
    Comment,
    PlayBtn,
    LikedBtn,
    ShareBtnDialog,
    //AddBtnDialog,
  }, 
  data() {return {}},
  methods: {},
};
</script>
<style lang="scss">
  .fixed-action-btn {
    position: fixed;
    // right: 30px;
    bottom: 30px;
    // padding-top: 15px;
    // margin-bottom: 0;
    z-index: 998;
}
.v-card__title .sticky-header {
  position: sticky;
  top: var(--toolbarHeight);
}

div.v-card__title.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
  
</style>
