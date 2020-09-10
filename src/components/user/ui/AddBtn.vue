<template>
  <v-row>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="dialog = true"
          elevation="0"
          class="fixed-action-btn"
          color="#42b983"
          dark
          absolute
          attach
          right
          fab
          v-on="on" 
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Create a yogurt</span>
    </v-tooltip>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <!-------------------------  ADD FORM CARD ------------------>
      <v-card>
        <!-------------------------  ADD FORM TOOLBAR ------------------>
        <v-toolbar dark color="primario white--text">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="text-center">Create a yogurt</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-snackbar @yogurtError="snackbar = true" v-model="snackbar" :timeout="6000" top color="error white--text">
          <span>The form can't be submitted until all fields are filled out.</span>
          <v-btn text color="white" @click="snackbar = false">CLOSE</v-btn>
        </v-snackbar>
        <!-------------------------  END ADD FORM TOOLBAR ------------------>
        <!-------------------------  ADD FORM  ---------------------->
        <v-form @submit.prevent="addYogurt" ref="form" name="createYogurt" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <v-row class="d-flex justify-center align-center mt-10">
                <v-col cols="12">
                  <v-text-field v-model="title" name="title" required label="Name your yogurt *" type="text" prepend-icon="folder" color="cyan" :rules="inputRules">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="content" name="create" required label="Create your yogurt" prepend-icon="mdi-file-document-edit-outline" type="text" color="cyan" :rules="inputRules">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu offset-y min-width="290px" :nudge-right="40" :return-value.sync="computedDateFormattedMomentjs">
                    <template v-slot:activator="{ on }">
                      <v-text-field label="Set a date" :rules="dateRules" v-on="on" :value="computedDateFormattedMomentjs" prepend-icon="mdi-calendar"></v-text-field>
                    </template>
                      <v-date-picker v-model="due"></v-date-picker>
                  </v-menu>
                    <!-- Date Picker -->
                </v-col>
                <v-col cols="12" md="6">
              <!--<v-menu
                    ref="menuTime"
                    v-model="menuTime"
                    :close-on-content-click="false"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Set a time"
                        prepend-icon="access_time"
                        :rules="inputRules"
                        ampm-in-title
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-model="time" color="#32BCC3" ampm-in-title scrollable>
                      <div class="flex-grow-1"></div>
                      <v-btn outlined color="#32BCC3" @click="menuTime = false">Cancel</v-btn>
                      <v-btn color="#32BCC3" dark @click="$refs.menuTime.save(time)">OK</v-btn>
                    </v-time-picker>
                  </v-menu> -->
                </v-col>
              </v-row>
              <v-layout row wrap>
                  <!-- <v-flex xs12>
                      <v-text-field
                      :mask="mask"
                      label="time">
                      </v-text-field>
                  </v-flex> -->
                  <!-- <v-col cols="12" md="6">
                      <v-text-field
                          pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                          type="time" datetime-local
                          label="time"
                      >
                      </v-text-field>
                  </v-col> -->
              </v-layout>
              <small>*indicates required field</small>
            </v-container>
          </v-card-text>
          <v-card-actions mr-4>
            <v-container>
              <v-row>
                <v-col class="text-right" pe-10>
                  <v-btn 
                    outlined
                    color="#32BCC3"
                    :loading="loading"
                    :disabled="!valid"
                    type="submit"
                    class="text-right mr-4"
                  > 
                    {{ $t('createYogurt')}}
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
            </v-container>                    
          </v-card-actions>
        </v-form>
        <!-------------------------  END ADD FORM  ---------------------->
        <!-------------------------  EDIT FORM COMPONENT ------------------->
        <!-- <AppEditForm></AppEditForm> -->
        <!-------------------------  END EDIT FORM COMPONENT ----------------->
        
      </v-card>
      <!-------------------------  END ADD FORM CARD ------------------>
    </v-dialog>
  </v-row>
</template>

<script>
// import AppEditForm from '../yogurt/AppEditForm'
import { mapGetters } from 'vuex';
import { EventBus } from '../../../eventbus';
import { db } from '../../../firebaseinit'
import moment from 'moment';
export default {
  components: {
    //AppEditForm
  },
   data: () => ({
    type: Object,
    snackbar: false,
    required: true,
    valid: true,
    dialog: false,
    loading: false,
    title: '',
    content: '',
    due: '',
    data: '',
    time: '',
    dateRules: [
      v => !!v || 'Invalid entry. Click to pick a date'
    ],
    inputRules: [
      v => !!v || 'Minimum length is required of 4 characters'
    ],
  }),
  computed: {
    ...mapGetters('auth', ['authenticated', 'user']),
    computedDateFormattedMomentjs() {
        return this.due ? moment(this.due).format('dddd, MMMM Do YYYY') : ''
    },
  },
  methods: {
    addYogurt() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const collectionRef = db.collection('users/'+this.user.uid+'/user_yogurts');
        
        const yogurt = {
          title: this.title,
          content: this.content,
          date: moment(this.due).format('dddd, MMMM Do YYYY'),
          //time: this.time,
          status: 'ongoing',
          //priority: 100,
        }
        collectionRef.add(yogurt).then(() => {
          this.loading = false;
          this.dialog = false;
          this.formReset();
          this.$emit('yogurtAdded');
        });
      } else {
        this.$emit('yogurtError')
        alert('The form can\'t be submitted until all fields are filled out.')
      }
    },
    formReset() {
      this.$refs.form.reset(),
      this.$refs.form.resetValidation(),
      this.title = '',
      this.content = '',
      this.date = ''
      //this.time = null
    },
    reset () {
      this.$refs.form.reset() && this.$refs.form.resetValidation()
    },
  },
  mounted() {
    EventBus.$on('dialog', (value) => {
      this.dialog = value
    })
  },
}
</script>