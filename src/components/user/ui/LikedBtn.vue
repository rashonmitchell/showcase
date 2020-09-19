<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon @click="liked = !liked" v-on="on" class="mr-1" v-bind:color="liked ? '' : 'error'">mdi-heart</v-icon>
        </template>
        <span>{{ liked ? 'Like this yogurt' : 'Yogurt Liked' }}</span>
        <!-- <span v-else>UnLike this yogurt</span> -->
    </v-tooltip>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  data() {
    return {
      liked: true,
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