<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-textarea label="A short Bio about You" type="text"  color="cyan" no-resize>
                        </v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Your personal/professional Website" type="text" color="cyan">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <!-- <v-text-field label="Your Location" type="text" required v-model="userDetails.location" :loading="loadingForm" color="cyan"> -->
                        <v-text-field label="Your Location" type="text" color="cyan">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-menu
                            ref="menu"
                            v-model="menuDate"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    label="Set a date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn text color="primary" @click="menuDate = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menuDate.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-menu
                            ref="menu"
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
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-time-picker v-if="menuTime" v-model="time" color="#32BCC3" ampm-in-title scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn outlined color="#32BCC3" @click="menu = false">Cancel</v-btn>
                                <v-btn color="#32BCC3" dark @click="$refs.menu.save(time)">OK</v-btn>
                            </v-time-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions mr-4>
            <v-row>
                <v-col class="text-right" pe-10>
                    <v-btn 
                        mr-4
                        color="#32BCC3" 
                        elevation="0" 
                        dark
                        :loading="loadingForm" 
                        type="submit"
                    > 
                        {{ $t('Save')}}
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-col>
            </v-row>
            <!-- <v-btn color="cyan darken-1" :disabled="loadingForm" text @click.stop="$emit('click')">Close</v-btn> -->
            
        </v-card-actions>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    // props: {
    //     data: {
    //         type: Object,
    //         required: true
    //     }
    // },
    data() {
        return {
            time: null,
            date: null,
            menuDate: false,
            menuTime: false,
            userDetails: {
                // bio: '',
                // website: '',
                // location: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$store.dispatch('EDIT_USER_DETAILS', this.userDetails)
            .then(() => {
                this.$emit('click')
            })
        }
    },
    mounted() {
        // this.data.bio ? this.userDetails.bio = this.data.bio : '';
        // this.data.website ? this.userDetails.website = this.data.website : '';
        // this.data.location ? this.userDetails.location = this.data.location : '';
    },
    computed: {
        ...mapGetters(['loadingForm'])
    }
}
</script>
