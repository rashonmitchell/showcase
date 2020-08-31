export const likeMethod = {
  methods: {
    likeScream(isAuthenticated, scream) {
      if(isAuthenticated && scream) {
        if(!this.isLiked) {
          this.$store.dispatch('LIKE_SCREAM', scream.screamId)
        }
        else {
          this.$store.dispatch('UNLIKE_SCREAM', scream.screamId)
        }
      }
      else {
        this.$router.push({name: 'login'});
      }
    },
  }
}