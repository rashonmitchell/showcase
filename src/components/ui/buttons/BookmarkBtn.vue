<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon @click="bookmarked = !bookmarked" v-on="on" class="mr-1" v-bind:color="bookmarked ? '' : 'yellow'">mdi-bookmark</v-icon>
        </template>
        <span>{{ bookmarked ? 'Bookmark this yogurt' : 'Yogurt Bookmarked!' }}</span>
    </v-tooltip>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  data() {
    return {
      bookmarked: true,
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