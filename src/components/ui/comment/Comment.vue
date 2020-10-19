<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon @click="commented = !commented" v-on="on" class="mr-1" v-bind:color="commented? '' : 'primary'">mdi-forum</v-icon>
        </template>
        <span>{{ commented ? 'Comment on this yogurt' : 'Yogurt Commented!' }}</span>
    </v-tooltip>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  data() {
    return {
      commented: true,
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