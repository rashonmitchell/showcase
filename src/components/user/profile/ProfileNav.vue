<template>
    <v-container dark >
        <v-row class="pa-3">
            <v-col offset="1" cols="10" class="center relative">
                <v-avatar size="200">
                    <v-img class="card-img" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"></v-img>
                </v-avatar>

                <!------------------ EDIT IMAGE BUTTON ------------------>
                <div >
                    <input type="file" id="imageInput" hidden @change="handleImageChange">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn class="mx-2" fab small color="#32BCC3" absolute right bottom @click="editImage" v-on="on" dark>
                                <v-icon dark>{{svg.camera}}</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Profile Image</span>
                    </v-tooltip>
                </div>
                <!------------------ EDIT IMAGE BUTTON ------------------>
            </v-col>
            <v-col offset="1" cols="10" color="#32BCC3">
                <v-row>
                    <v-col>
                        <!------------------ PROFILE DATA ------------------>
                        <div class="text-center mb-3 title text-secundario font-weight-bold">
                            <span>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</span> 
                        </div>
                        <div  class="text-center mb-3 pr-5 pl-5 font-weight-regular">
                            bio
                        </div>
                        <div class="text-center mb-3">
                            <v-icon>{{svg.location}}</v-icon>
                            <span>
                                location
                               
                            </span>
                        </div>
                        <div  class="text-center mb-3">
                            <v-icon>{{svg.web}}</v-icon>
                            <span>
                                web
                                <!-- <a :href="data.website" target="_blank">&nbsp;{{data.website}}</a> -->
                            </span>
                        </div>
                        <div class="text-center">
                            <v-icon>{{svg.calendar}}</v-icon>
                            <span>
                                date joined: <br>
                                {{ moment(loggedInUser.createdAt).format('LL') }}
                                <!-- {{data.createdAt | day}} -->
                            </span>
                            <br>
                            <!-- {{ moment(loggedInUser.createdAt).format("ddd, MMM Do YYYY") }} Mon, Aug 17th 2020 -->
                        </div>
                        <!------------------ END PROFILE DATA ------------------>
                        <div class="mt-5">
                            <!-- <div v-if="isAuthenticated && userCredentials.handle === data.handle"> -->
                                <!--------------- EDIT PROFILE MODAL ----------------->
                                <ProfileEdit :data="data"></ProfileEdit>
                                <!---------------END EDIT PROFILE MODAL ------------->
                            <!-- </div> -->
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// COMPONENTS
import ProfileEdit from '../profile/ProfileEdit';
import moment from 'moment';

// SVG ICONS
import { mdiMapMarker, mdiWeb, mdiCalendar, mdiPencil, mdiPencilOutline, mdiCameraRetakeOutline } from '@mdi/js';

// VUEX
import { mapGetters } from 'vuex';
export default {
    components: {
        ProfileEdit,
    },
    props: {
        data: {
            type: Object,
        }
    },
    data: () => ({
        //date: loggedInUser.createdAt.toDate().toDateString(),
        moment: moment,
        svg: {
            location: mdiMapMarker,
            web: mdiWeb,
            calendar: mdiCalendar,
            pencil: mdiPencil,
            camera: mdiCameraRetakeOutline
        }
    }),
    methods: {
        handleImageChange(event) {
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append('image', image, image.name);
            this.$store.dispatch('UPLOAD_IMAGE', formData);
        },
        editImage() {
            const imageInput = document.getElementById('imageInput');
            imageInput.click();
        }
    },
    computed: {
        //...mapGetters(['isAuthenticated', 'userCredentials'])
        ...mapGetters('auth', ['authenticated', 'loggedInUser']),
    }
}
</script>
