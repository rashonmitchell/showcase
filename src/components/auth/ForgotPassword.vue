<template>
    <v-container fluid>
        <v-row class="d-flex justify-center align-center mt-10" max-width="600">
            <v-col>
                <v-card class="mx-auto" max-width="600">
                    <v-progress-linear v-if="user" indeterminate color="primary"></v-progress-linear>
                    <v-form class="px-4" ref="form" v-model="valid" lazy-validation @submit.prevent="validate">
                    <h1 class="primary--text font-weight-light px-4 pt-4 text-center">{{ $t('forgotPasswordTitle') }}</h1>
                        <v-row>
                            <v-col>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                :label="$t('email')"
                                required
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
                                  {{ $t('resetPassword') }} 
                                </v-btn>
                                <hr class="mt-4">
                                <p class="text-right mt-2">
                                    <!-- New User? Sign up for an account -->
                                    <router-link to="/login" class="text-info">{{ $t('rememberPassword') }}</router-link>
                                </p>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data(){
    return {
        valid: true,
        email: null,
        emailRules: [
            v => !!v || `${this.$t('emailIsRequired')}`,
            v => /.+@.+/.test(v) || `${this.$t('emailMustBeValid')}` 
        ]
    };
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
      ...mapActions('auth', ['forgotPassword']),
      validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        const user = {email: this.email}
        this.forgotPassword(user);
      }
    }
  }
};
</script>
<style>
/* #app {
  background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
  background-size: cover;
  overflow:hidden;
}
.loginOverlay {
  background:rgba(33,150,243,0.3);
}
.photoCredit{
  position: absolute;
  bottom: 15px;
  right: 15px;
} */
</style>
