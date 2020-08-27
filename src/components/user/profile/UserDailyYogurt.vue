<template>
<div class="profile mt-3 mb-3">
    <b-container class="bv-example-row">
        <UserSettingsHeader :user="user" />

        <b-row>
            <UserSettingsMenu/>
            <b-col cols="8" class="tab-content" id="myTabContent">
                <b-card 
                    id="nav-dailyYo-tab" 
                    title="Daily Yogurt" 
                    align="left">
                    <b-form-group
                        label="Email Delivery Time:"
                        label-for="time"
                    >
                        <b-form-select
                        class="mb-3 form-control col-4"
                        value-field="item"
                        id="hour"
                        > 
                        <!-- add this back in for all the form-select 
                        v-model="selected"
                        :options="options-country"  -->

                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09" selected="selected">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        
                        </b-form-select>
                        <b-form-select
                        class="mb-3 form-control col-4"
                        value-field="item"
                        text-field="minute"
                        id="minute"
                        >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        </b-form-select>
                        <b-form-select
                        class="mb-3 form-control col-4"
                        value-field="item"
                        text-field="meridian"
                        id="meridian"
                        >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        </b-form-select>
                    <b-link href="#" class="card-link btn btn-outline-success">Subscribe</b-link>
                    </b-form-group>

                    <b-form-group
                        label="Daily Push Notifications"
                    >
                        # todo:<br><br>
                        # add push notfications for desktop/mobile<br><br>
                        # add mobile device info
                    </b-form-group>
                    
                    <b-link href="#" class="card-link btn btn-outline-success">Update Daily Yogurt</b-link>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import UserSettingsHeader from '@/components/user/settings/UserSettingsHeader'
import UserSettingsMenu from '@/components/user/settings/UserSettingsMenu'
export default {
    name: 'UserDailyYogurt',
    components: {
        UserSettingsHeader,
        UserSettingsMenu
    },
    props: ["user"]
}
</script>
