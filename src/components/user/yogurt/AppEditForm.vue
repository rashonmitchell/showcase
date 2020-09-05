<template>
    <v-row class="d-flex justify-center align-center mt-10">
        <v-col max-width="600">
            <v-form @submit.prevent="addYogurt" ref="form" name="createYogurt" lazy-validation>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <!-- <h2>{{ user.uid}}</h2> -->
                                <v-text-field v-model="title" name="title" required label="Name your yogurt" type="text" icon="folder" color="cyan">
                                    <v-icon slot="prepend">folder</v-icon>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="content" name="create" required label="Create your yogurt" type="text" color="cyan">
                                    <v-icon slot="prepend">mdi-file-document-edit-outline</v-icon>
                                </v-text-field>
                            </v-col>
                            <!-- <v-col cols="12">
                                <v-text-field label="Your Location" type="text" required v-model="userDetails.location" :loading="loadingForm" color="cyan">
                                <v-text-field label="Your Location" type="text" color="cyan">
                                </v-text-field>
                            </v-col> -->
                            <!-- Date & Time -->
                            <v-col cols="12" md="6">
                                <v-menu
                                    ref="menuDate"
                                    :close-on-content-click="false"
                                    v-model="menuDate"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateFormatted"
                                            label="Set a date"
                                            v-bind="attrs"
                                            prepend-icon="mdi-calendar"
                                            v-on="on"
                                            :rules="dateRules"
                                            @blur="date = parseDate(dateFormatted)"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title>
                                    </v-date-picker>
                                </v-menu>
                                <!-- Date Picker -->
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-menu
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
                                            v-model="timeFormatted"
                                            label="Set a time"
                                            prepend-icon="access_time"
                                            :rules="timeRules"
                                            ampm-in-title
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker v-model="time" color="#32BCC3" ampm-in-title scrollable>
                                        <div class="flex-grow-1"></div>
                                        <v-btn outlined color="#32BCC3" @click="menuTime = false">Cancel</v-btn>
                                        <v-btn color="#32BCC3" dark @click="$refs.menuTime.save(time)">OK</v-btn>
                                    </v-time-picker>
                                </v-menu>
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
                                    type="submit"
                                    class="text-right mr-4"
                                    @click="validate"
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
                    <!-- <v-btn color="cyan darken-1" :disabled="loadingForm" text @click.stop="$emit('click')">Close</v-btn> -->
                    
                </v-card-actions>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import format from 'date-fns/format'
import { EventBus } from '../../../eventbus'
export default {
    data: vm => ({
            dialog: false,
            createYogurt: null,
            // mask: '##:##',
            value: '',
            time: '',
            date: '',
            dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            timeFormatted: (new SimpleDateFormat("hh:mm a")),
            title: '',
            content: '',
            menuDate: false,
            menuTime: false,
            loading: false,
            due: null,
            userId: '',
            dateRules: [
                v =>(v.length >= 4) || 'Invalid entry. Click to pick a date'
            ],
            timeRules: [
                t =>(t.length != null) || 'Invalid entry. Click to pick a time'
            ],
            userDetails: {
                // bio: '',
                // website: '',
                // location: ''
            }
    }),
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    computed: {
        ...mapGetters('auth', ['authenticated', 'loggedInUser', 'user']),
        formattedDate() {
            return this.date ? format(this.date, 'Do MMM YYYY') : ''
        },
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
    },
    methods: {
        //...mapActions('auth', ['signUpAction']),
        // addYogurt: function () {
        //     this.$emit("addYogurt", this.meetingName);
        //     this.meetingName = null;
        //     this.$refs.meetingName.focus();
        // },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        addYogurt() {
            if(this.title.length > 0 && this.date.length >= 4 && this.time.length != null) {
                this.loading = true;
                const collectionRef = db.collection('users/'+this.userId+'/users-yogurts');
                
                const project = {
                    title: this.title,
                    content: this.content,
                    date: format(this.date, 'Do MMM YYYY'),
                    time: this.time,
                    status: 'ongoing',
                    priority: 100,
                }
                collectionRef.add(project).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.formReset();
                    EventBus.$emit('project-added');
                });
                this.alerta = false;
                
            } else {
                this.alerta = true;
            }
        },
        formReset() {
            this.title = '',
            this.content = '',
            this.date = null,
            this.time = null
        },

        validate () {
            if (this.$refs.form.validate()) {
                const user = {email: this.email, password: this.password, displayName: this.displayName}
                this.signUpAction(user);
            }
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
<style lang="scss">
 .div.v-card__title.sticky {
    background-color: "#35495e blue" ;
    background-color: "#42b883 green";
 }
</style>