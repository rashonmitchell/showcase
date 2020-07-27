<template>
    <v-row class="d-flex justify-center align-center">
        <v-col cols="6">
            <v-card>
                <v-progress-linear v-if="loggingIn" indeterminate color="primary"></v-progress-linear>
                <h1 class="primary--text font-weight-light px-4 pt-4 text-center">Sign Up</h1>
                <v-form class="px-4" ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                label="Password"
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
                                :disabled="!valid"
                                color="success"
                                @click="validate"
                            >
                                Login
                            </v-btn>
                            <!-- <v-btn
                                color="error"
                                @click="reset"
                            >
                                Reset Form
                            </v-btn> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <p class="text-primary">
                                Or Sign In Using
                            </p>
                            <button 
                                class="btn social-btn-google follow-google" 
                                @click="socialLogin"
                            >
                                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google' }"></font-awesome-icon>
                                <span class="ml-3">Google</span>
                            </button>
                            
                            <button 
                                class="btn social-btn-facebook follow-facebook" 
                                @click="socialLoginFacebook"
                            >
                                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"></font-awesome-icon>
                                <span class="ml-3 span-social">Facebook</span>
                            </button>
                        </v-col>
                    </v-row>
                    <hr class="primary">
                    <v-row>
                        <v-col>
                            <p class="text-right mt-2">
                                <!-- New User? Sign up for an account -->
                                <router-link to="/register" class="text-info">No account yet?</router-link>
                            </p>
                            <p class="text-right mt-2">
                                <router-link to="/forgot-password" class="text-info">Forgot password?</router-link>
                            </p> 
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is Required'
    ]
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.loginWithFirebase()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    loginWithFirebase () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signInAction', user)
    }
  }
}
</script>

<style lang="scss">
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
