<template>
    <v-row class="d-flex justify-center align-center">
        <v-col cols="6">
            <v-card class="mx-auto mt-4">
                <v-progress-linear v-if="signingUp" indeterminate color="primary"></v-progress-linear>
                <h1 class="primary--text font-weight-light px-4 pt-4 text-center">Sign Up</h1>
                <v-form class="px-4" ref="form" v-model="valid" lazy-validation>
                  <v-row>
                      <v-col>
                        <v-text-field
                              v-model="displayName"
                              label="Full Name"
                              required
                          ></v-text-field>
                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="Email"
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
                          <v-text-field
                              v-model="confirmPassword"
                              label="Confirm Password"
                              :rules="passwordRules"
                              required
                              :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                              :type="confirmPasswordShow ? 'text' : 'password'"
                              @click:append="confirmPasswordShow = !confirmPasswordShow"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col class="text-right">
                          <v-btn
                              outlined
                              :disabled="!valid"
                              class="text-right"
                              color="success"
                              @click="validate"
                          >
                              Register
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
                    <v-col>
                      <hr class="primary">
                      <p class="text-right mt-4">
                        <router-link to="/login" class="text-primary">Already have an account?</router-link>
                      </p>
                    </v-col>
                  </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: function(){
    return {
      passwordShow: false,
      confirmPasswordShow: false,
      valid: true,
      displayName: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password and Confirm password Required'
      ]
    }
  },
  computed: {
    ...mapGetters("auth", ["signingUp"])
  },
  methods: {
    ...mapActions("auth", ["signUpAction"]),
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        //this.registerWithFirebase()
        const user = {email: this.email, password: this.password}
        this.signUpAction(user);
      }
    },
    // reset () {
    //   this.$refs.form.reset()
    // },
    // registerWithFirebase () {
    //   const user = {
    //     email: this.email,
    //     password: this.password,
    //     displayName: this.displayName
    //   }
    //   this.$store.dispatch('signUpAction', user)
    // }
  }
}
</script>