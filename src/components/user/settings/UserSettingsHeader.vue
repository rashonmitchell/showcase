<template>
  <v-container fluid elevation-2 primaryColor class="mx-auto">
    <v-layout row>
      <v-flex md3 order-md1>
        <v-col class="d-flex justify-center">
          <v-avatar v-if="loggedInUser.providerData[0].photoURL !== null || loggedInUser.photo === null" size="50">
            <img v-bind:src="loggedInUser.providerData[0].photoURL || loggedInUser.photo" >
          </v-avatar>
          <v-img v-else class="card-img" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"></v-img>

          <!-- <span ml-5>{{ loggedInUser.displayName }}</span> -->
          <strong style="align-self:flex-end;">{{loggedInUser.displayName}}</strong>
        </v-col>
      </v-flex>
      <v-flex md6 order-md2 align-end class="d-flex justify-center" >
        <v-col>
          <div class="item">
            <!-- <router-link :to="`/${user.displayName}`"> -->
              <div class="header">Yogurts</div>
              <strong>0</strong>
            <!-- </router-link> -->
          </div>
        </v-col>
        <v-col >
          <div class="item">
            <!-- <router-link :to="isOwner ? `/following` : `/${user.displayName}/following`"> -->
              <div class="header">Following</div>
              <strong>0</strong>
              <!-- <strong>{{ user.following.length }}</strong>
            </router-link> -->
          </div>
        </v-col>
        <v-col >
          <div class="item">
            <!-- <router-link :to="isOwner ? `/followers` : `/${user.displayName}/followers`"> -->
              <div class="header">Followers</div>
              <strong>0</strong>
              <!-- <strong>{{ user.followers.length }}</strong> -->
            <!-- </router-link> -->
          </div>
        </v-col>
        <v-col>
          <div class="item">
            <!-- <router-link :to="isOwner ? `/favorites` : `/${user.displayName}/favorites`"> -->
              <div class="header">Favorites</div>
              <strong>0</strong>
              <!-- <strong>{{ user.favorites.length }}</strong> -->
            <!-- </router-link> -->
          </div>
        </v-col>
        
      </v-flex>
      <v-flex md2 order-md3 align-center class="d-flex justify-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#32BCC3" v-on="on" elevation="0" dark :to="{path: '/settings'}">
              <v-icon left>{{svg.pencil}}</v-icon>
              Edit Profile
            </v-btn>
          </template>
          <span>Edit Profile</span>
        </v-tooltip>
        <!-- <router-link to="/settings/profile" class="ui button primary">Edit profile</router-link> -->
      </v-flex>
    </v-layout>
   
  </v-container>
    <!-- <b-row class="mb-3 profile-userpic">
      <h1><font-awesome-icon icon="user-circle"></font-awesome-icon> {{ user.displayName}}</h1>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="text-center profile-userpic">
          <input type="file" id="file" style="display:none;" />
          <button 
            id="edit-upload" name="edit-upload"
            class="text-info image-edit"
            v-on:click="thisFileUpload();">
              <font-awesome-icon class="edit-pencil" icon="pencil-alt"></font-awesome-icon>
          </button>
          <h2 class="text-left">
            <img v-bind:src="user.photoURL" class="avatar img-circle img-thumbnail" alt="avatar" />
            {{ user.displayName}}
          </h2>
          <div v-if="isProfileEditMode">
            <h6>Upload a different photo...</h6>
            <input type="file" class="text-center center-block well well-sm" @change="fileUploadChange" />
          </div>
        </div>
      </div>
    </b-row> -->
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import { mdiPencil } from '@mdi/js';
export default {
  name: "UserSettingsHeader",
  //name: 'UserProfileHeader',
  //props: ["user"],
  props: {
    // user: {
    //   type: Object,
    //   required: true
    // },
    // authUser: {
    //   type: Object,
    //   required: true
    // }
  },
  data:() => ({
      //isProfileEditMode: false,
    svg: {
      pencil: mdiPencil
    },
  }),
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'loggedInUser']),
      // isOwner () {
      //   return this.loggedInUser.id === this.authUser.id
      // },
      // isLoggedIn () {
      //   return !!this.authUser
      // },
      // isFollowing () {
      //   for (const following of this.authUser.following) {
      //     if (following.id === this.user.id) {
      //       return true
      //     }
      //   }

      //   return false
      // }
    },
    methods: {
      thisFileUpload() {
        document.getElementById("file").click();
      },
      follow (userId) {
        const token = localStorage.getItem('tweetr-token')

        axios
          .post(
            '/users/follow',
            { user_id: userId },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.authUser.following.push({ id: userId })
          })
      },
      unFollow (userId) {
        const token = localStorage.getItem('tweetr-token')

        axios
          .delete(`/users/unfollow/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser.following = this.authUser.following.filter(u => {
              return u.id !== userId
            })
          })
      }
    }
}
</script>

<style lang="scss">
.profile-userpic img {
  float: none;
  margin: 0 auto;
  margin-top: -5px;
  width: 15%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
  position: relative;
}

.img-thumbnail {
  // padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  height: auto;
  max-width: 100%;
}
.image-edit {
  background: transparent;
  border: none;
  position: absolute;
  left: 50px;
  top: 0;
  z-index: 2;
}
.edit-pencil {
  padding-bottom: 8px;
  width: 18px;

  :focus {
    border: none;
  }
}
</style>
