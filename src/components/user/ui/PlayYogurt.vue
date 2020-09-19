<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
                <v-icon @click="played = !played" v-on="on" depressed class="mr-1" :color="played ? '' : '#42b883'">
                    {{ played ? 'mdi-play-circle-outline' : 'mdi-stop-circle-outline' }}
                </v-icon>
        </template>
        <span>{{ played ? 'Hear this yogurt' : 'Yogurt Playing' }}</span>
    </v-tooltip>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  data() {
    return {
      played: true,
    }
  },
  methods: {
    // ...mapActions('auth', ['signOutAction']),
  },
  computed: {
    // ...mapGetters(['loadingUser'])
  }
}
</script>