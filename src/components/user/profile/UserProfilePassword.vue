<template>
    <v-row>
        <v-col>
            <v-card flat>
                <h3 class="font-weight-light px-4 pt-4 text-center" mainColor>
                    {{ $t('editPassword') }}
                </h3>
                <v-form class="px-4" ref="form" v-model="valid" lazy-validation>
                  <!-- <v-snackbar v-if="this.$store.state.error">
                    {{ this.$store.state.error }}
                  </v-snackbar> -->
                  <v-row>
                      <v-col>
                        <v-text-field
                              :label="$t('currentPassword')"
                              required
                              :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                              :type="passwordShow ? 'text' : 'password'"
                          ></v-text-field>
                          <v-text-field
                              :label="$t('password')"
                              required
                              :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                              :type="passwordShow ? 'text' : 'password'"
                          ></v-text-field>
                          <v-text-field
                              :label="$t('confirmPassword')"
                              :rules="passwordRules"
                              required
                              :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                              :type="confirmPasswordShow ? 'text' : 'password'"
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
                          >
                            {{ $t('updatePassword') }}
                          </v-btn>
                          <v-btn 
                            color="#32BCC3" 
                            elevation="0" 
                            dark
                          > 
                            {{ $t('clearForm')}}
                          </v-btn>
                          <!-- <v-btn
                              color="error"
                              @click="reset"
                          >
                              Reset Form
                          </v-btn> -->
                      </v-col>
                  </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data: function(){
    return {
      passwordShow: false,
      confirmPasswordShow: false,
      valid: true,
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || `${this.$t('passwordAndConfirmPasswordRequiredd')}` 
      ]
    }
  },
}
</script>