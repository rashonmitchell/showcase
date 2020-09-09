<template>
    <v-card flat outlined color="#35495e">
        <v-container dark color="#35495e">
            <v-row>
                <v-col offset="1" cols="10" class="center relative">
                    <v-avatar v-if="loggedInUser.providerData[0].photoURL !== null || loggedInUser.photo === null" size="100">
                        <img v-bind:src="loggedInUser.providerData[0].photoURL || loggedInUser.photo" >
                    </v-avatar>
                    <!-- <v-avatar size="100">
                        <v-img class="card-img" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"></v-img>
                    </v-avatar> -->
                    <!------------------ EDIT IMAGE BUTTON ------------------>
                    <div >
                        <input type="file" id="imageInput" hidden accept="image/*" @change="handleImageChange">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn class="mx-2" fab small color="#32BCC3" :loading="isSelecting" absolute right bottom @click="editImage" v-on="on" dark>
                                    <v-icon dark>{{svg.camera}}</v-icon>
                                    {{ buttonText }}
                                </v-btn>
                            </template>
                            <span>Edit Profile Image</span>
                        </v-tooltip>
                    </div>
                    <!------------------ EDIT IMAGE BUTTON ------------------>
                </v-col>
                <v-col offset="1" cols="10" color="#1F7087">
                    <v-row dense>
                        <v-col>
                            <!------------------ PROFILE DATA ------------------>
                            <!-- <div class="text-center mb-3 title text-secundario font-weight-bold">
                                <span>{{ $t('welcomeUser', {fulllName: loggedInUser.displayName}) }}</span> 
                            </div> -->

                            <v-list disabled two-line outlined rounded color="#42b883">
                                <v-list-item-group color="primary" class="">
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon dark>mdi-card-account-details-outline</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>Bio:</v-list-item-title>
                                            <v-list-item-subtitle># bio here</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon dark>{{svg.location}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>Location:</v-list-item-title>
                                            <v-list-item-subtitle># location here</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon dark>{{svg.calendar}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>Joined:</v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ moment(loggedInUser.createdAt).format('LL') }}
                                                <!-- {{data.createdAt | day}} -->
                                                <!-- {{ moment(loggedInUser.createdAt).format("ddd, MMM Do YYYY") }} Mon, Aug 17th 2020 -->
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                            
                            <!------------------ END PROFILE DATA ------------------>
                            <!-- <div class="mt-5"> -->
                                <!-- <div v-if="isAuthenticated && userCredentials.handle === data.handle"> -->
                                    <!--------------- EDIT PROFILE MODAL ----------------->
                                    <!-- <ProfileEdit :data="data"></ProfileEdit> -->
                                    <!---------------END EDIT PROFILE MODAL ------------->
                                <!-- </div> -->
                            <!-- </div> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
    
</template>

<script>
import ProfileEdit from '../profile/ProfileEdit';
import moment from 'moment';
import { mdiMapMarker, mdiWeb, mdiCalendar, mdiPencil, mdiPencilOutline, mdiCameraRetakeOutline } from '@mdi/js';
import { mapGetters } from 'vuex';
export default {
    components: {
        ProfileEdit,
    },
    data: () => ({
        //date: loggedInUser.createdAt.toDate().toDateString(),
        moment: moment,
        defaultButtonText: '',
        selectedFile: null,
        isSelecting: false,
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
        },
        onButtonClick() {
            this.isSelecting = true
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true })

            this.$refs.uploader.click()
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0]
            // do something
        }
    },
    computed: {
        ...mapGetters('auth', ['authenticated', 'loggedInUser']),
        buttonText() {
            return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
        }
    }
}
</script>