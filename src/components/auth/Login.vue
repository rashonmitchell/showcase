<template>
  <v-row class="d-flex justify-center align-center mt-10">
    <v-col>
      <v-card class="mx-auto" max-width="600">
        <v-progress-linear v-if="loggingIn" indeterminate color="primary"></v-progress-linear>
        <h1 class="primary--text font-weight-light px-4 pt-4 text-center">{{ $t('signIn') }}</h1>
        <v-form class="px-4" ref="form" v-model="valid" lazy-validation @submit.prevent="validate">
          <v-row>
            <!-- <v-snackbar v-if="this.$store.state.error">
              {{ this.$store.state.error }}
            </v-snackbar> -->
            <v-col>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="$t('email')"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :label="$t('password')"
                required
                :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn
                outlined
                type="submit"
                :disabled="!valid"
                color="success"
                @click="validate"
              >
                  {{ $t('signIn') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="error"
                  @click="reset"
              >
                {{ $t('resetForm') }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <p class="text-primary">{{ $t('orSignInUsing') }}</p>
              <button 
                class="btn social-btn-google follow-google" 
                @click.prevent="signInGoogle"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }"></font-awesome-icon>
                <span class="ml-3">{{ $t('google') }}</span>
              </button>
              
              <button 
                  class="btn social-btn-facebook follow-facebook" 
                  @click="signInFacebook"
              >
                  <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"></font-awesome-icon>
                  <span class="ml-3 span-social">{{ $t('facebook') }}</span>
              </button>
            </v-col>
          </v-row>
          <hr class="primary">
          <v-row>
            <v-col>
              <p class="text-right mt-2">
                <!-- New User? Sign up for an account -->
                <router-link to="/register" class="text-info">{{ $t('noAccountYet') }}</router-link>
              </p>
              <p class="text-right mt-2">
                <router-link to="/forgot-password" class="text-info">{{ $t('forgotPassword') }}</router-link>
              </p> 
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapActions, mapGetters } from "vuex";
export default {
  data(){
    return {
      passwordShow: false,
      valid: true,
      email: null,
      emailRules: [
        v => !!v || `${this.$t('emailIsRequired')}`,
        v => /.+@.+/.test(v) || `${this.$t('emailMustBeValid')}`
      ],
      password: '',
      passwordRules: [
        v => !!v || `${this.$t('passwordIsRequired')}`
      ]
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters("auth", ['loggingIn', 'error'])
  },
  methods: {
    ...mapActions("auth", ['signInAction', 'signInGoogle', 'signInFacebook']),
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        //this.loginWithFirebase()
        const user = {email: this.email, password: this.password}
        this.signInAction(user);
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  }
}
</script>

<style lang="scss">
.svg-inline--fa.fa-w-16 {
    width: 1.1em;
}
.card-body-lr {
  box-shadow: 5px 10px 18px #d3d3d3;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.span-social {
  text-align: center;
}
.social-btn-google:hover, 
.social-btn-google:active {
  background-color: white;
  color: #de5246;
}
.social-btn-facebook:hover, 
.social-btn-facebook:active {
  background-color: white;
  color: #3b5998;
}
.follow-google { 
  width: 42px;
  height: 42px;
  border-radius: 50px;
  background: #de5246;
  display: inline-block;
  margin-right: 10px;
  //margin: 50px calc(50% - 21px);
  white-space: nowrap;
  padding: 10px;
  box-sizing: border-box;
  color: white;
  transition: all 0.2s ease;
  font-family: Roboto, sans-serif;
  text-decoration: none;
  box-shadow: 0 5px 6px 0 rgba(0,0,0,0.2);
  i {
    margin-right: 20px;
    transition: margin-right 0.2s ease;
  }
  &:hover {
    width: 134px;
    //transform: translateX(-50px);
    i {
      margin-right: 10px;
    }
  }
}

.follow-facebook {
  width: 42px;
  height: 42px;
  border-radius: 50px;
  background: #3b5998;
  display: inline-block;
  //margin: 50px calc(50% - 21px);
  white-space: nowrap;
  padding: 10px;
  box-sizing: border-box;
  color: white;
  transition: all 0.2s ease;
  font-family: Roboto, sans-serif;
  text-decoration: none;
  box-shadow: 0 5px 6px 0 rgba(0,0,0,0.2);
  i {
    margin-right: 20px;
    transition: margin-left 0.2s ease;
  }
  &:hover {
    width: 134px;
    //transform: translateX(50px);
    i {
      margin-left: 10px;
    }
  }
}
.svg-inline--fa {
  display: inline-block;
  font-size: 21px;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>