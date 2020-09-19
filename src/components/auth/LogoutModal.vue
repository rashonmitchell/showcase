<template>
  <div>
    <!--------------------- LOGOUT BUTTON ----------------------->
    <v-list-item  text @click.stop="dialog = true">
        <v-icon left>logout</v-icon>
        <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
    </v-list-item>
    <!--------------------- END LOGOUT BUTTON ----------------------->

    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>{{ $t('logoutTagLine') }}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="cyan darken-1" text @click="dialog = false" >
            {{ $t('no') }}
          </v-btn>
          <v-btn color="cyan darken-1" text @click='signOutAction' >
            {{ $t('yes') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    ...mapActions('auth', ['signOutAction']),
  },
  computed: {
    // ...mapGetters(['loadingUser'])
  }
}
</script>

