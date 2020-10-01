<template>
    <v-row class="d-flex justify-center align-center mt-10">
        <v-col>
            <v-card class="mx-auto" max-width="600">
                <v-progress-linear v-if="signingUp" indeterminate color="#32BCC3"></v-progress-linear>
                <h1 class="primary--text font-weight-light px-4 pt-4 text-center">{{ $t('signUp') }}</h1>
                <v-form class="px-4" ref="form" v-model="valid" lazy-validation>
                  <v-snackbar v-if="this.$store.state.error">
                    {{ this.$store.state.error }}
                  </v-snackbar>
                  <v-row>
                      <v-col>
                        <v-text-field
                              v-model="displayName"
                              :label="$t('fullName')"
                              required
                          ></v-text-field> 
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
                          <v-text-field
                              v-model="confirmPassword"
                              :label="$t('confirmPassword')"
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
                        class="text-right mr-4"
                        color="#32BCC3"
                        @click="validate"
                      >
                        {{ $t('signUp') }}
                      </v-btn>
                      <v-btn
                        color="#32BCC3" 
                        elevation="0" 
                        dark
                        @click="reset"
                      >
                        {{ $t('clearForm')}}
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <hr class="primary">
                      <p class="text-right mt-4">
                        <router-link to="/login" class="text-primary">{{ $t('alreadyHaveAnAccount') }}</router-link>
                      </p>
                    </v-col>
                  </v-row>
                </v-form>
            </v-card>
        </v-col>

        <v-card elevation='24' max-width="474" color="#FFEC19" class='px-6 pb-2'>
  
          <v-card-title class="title py-8 pl-10 mb-3">
            {{TEXT_TITLE__CARD}}
            <v-spacer></v-spacer>
            <v-btn text icon><v-icon>close</v-icon></v-btn>
          </v-card-title>
          
          <v-card-text class="ml-12 pa-0">
            <v-card 
              elevation='24' color='white' width='456' class='pa-6'
            >
              <v-avatar size="85" class="mb-3 mt-n12">
                  <img :src="URL_IMAGE">
              </v-avatar>
              <v-text-field
                class="mt-4" label="USERNAME"
                placeholder="Martinator3000"
              ></v-text-field>
              <v-row>
                <v-col cols='6'>
                  <v-text-field
                    label="FIRST NAME" placeholder="Martin"
                  ></v-text-field>                
                </v-col>
                <v-col cols='6'>
                  <v-text-field
                    label="LAST NAME" placeholder="Lewis"
                  ></v-text-field>                            
                </v-col>
              </v-row>
              <v-text-field
                  label="EMAIL" placeholder="martin@lewis.com">
              </v-text-field>                        
              <v-textarea 
                label="BIO" :value='TEXT_PLACEHOLDER'>
              </v-textarea>                
            </v-card>          
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="text-capitalize" v-for="i in ['Cancel','Save']" :key='i' v-text="i"/>
          </v-card-actions>
          
        </v-card>
    </v-row>
</template>

<script>
const URL_IMAGE = 'https://i.imgur.com/DTr5WPa.png';
const TEXT_TITLE__CARD = 'Account Settings';
const TEXT_PLACEHOLDER = "Hey! My name is Martin and i love to design. Check out my store & don't forget to rate it.";
import { mapActions, mapGetters } from "vuex";
export default {
  data: function(){
    return {
      passwordShow: false,
      confirmPasswordShow: false,
      valid: true,
      displayName: '',
      error: '',
      email: '',
      emailRules: [
        v => !!v || `${this.$t('emailIsRequired')}`,
        v => /.+@.+/.test(v) || `${this.$t('emailMustBeValid')}` 
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || `${this.$t('passwordAndConfirmPasswordRequiredd')}` 
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['signingUp']),
  },
  methods: {
    ...mapActions('auth', ['signUpAction']),
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        //this.registerWithFirebase()
        const user = {email: this.email, password: this.password, displayName: this.displayName}
        this.signUpAction(user);
      }
    },
    reset () {
      this.$refs.form.reset() && this.$refs.form.resetValidation()
    }
  },
  created() {
    this.TEXT_TITLE__CARD = TEXT_TITLE__CARD;
    this.TEXT_PLACEHOLDER = TEXT_PLACEHOLDER;
    this.URL_IMAGE = URL_IMAGE;
  }
}
</script>