<template>
    <div>
    <!---------------------- SHARE DIALOG ------------------------->
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-icon @click="dialog = true" v-on="on" class="mr-1" v-bind:color="copied ? '' : 'primary'">mdi-share-variant</v-icon>
            </template>
            <span>Share this yogurt</span>
        </v-tooltip>
    <!--------------------- END SHARE DIALOG ----------------------->
        <v-dialog v-model="dialog" width="400" >
            <v-card>
                <v-card-title>
                    <span class="title font-weight-bold">{{$t('share')}}</span>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-0" icon @click="dialog = false">
                        <v-icon>mdi-close-circle-outline</v-icon>
                    </v-btn>
                </v-card-title>
                <v-list>
                    <v-list-item :href="'https://www.facebook.com/share.php?u=yogurt'">
                        <v-list-item-action>
                            <v-icon color="indigo">mdi-facebook</v-icon>
                        </v-list-item-action>
                        <v-card-title>{{$t('facebook')}}</v-card-title>
                    </v-list-item>
                    <v-list-item :href="'http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3'">
                    <!-- href="http://twitter.com/home?status=Check the Vue Mini Shop Out! It's either example App, built with Vue js https://bosnaufal.github.io/vue-mini-shop #vuejs #javascript #github" -->
                        <v-list-item-action>
                            <v-icon color="cyan">mdi-twitter</v-icon>
                        </v-list-item-action>
                        <v-card-title>{{$t('twitter')}}</v-card-title>
                    </v-list-item>
                    <v-list-item :href="'mailto:hsin.wang@sdl.usu.edu?subject=View this yogurt'">
                        <v-list-item-action>
                            <v-icon>mdi-email</v-icon>
                        </v-list-item-action>
                        <v-card-title>{{$t('email')}}</v-card-title>
                    </v-list-item>
                </v-list>
                <v-text-field
                    ref="link"
                    :label="copied ? `${this.$t('linkCopied')}` : `${this.$t('clickLink')}`"
                    class="pa-4"
                    readonly
                    value="https://g.co/kgs/nkrK43"
                    @click="copy"
                ></v-text-field>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
//import { mapActions } from 'vuex';
export default {
  data() {
    return {
      copied: false,
      dialog: false,
    }
  },
  methods: {
    // ...mapActions('auth', ['signOutAction']),
    copy() {
      const markup = this.$refs.link
      markup.focus()
      document.execCommand('selectAll', false, null)
      this.copied = document.execCommand('copy')
    },
  },
  computed: {
    // ...mapGetters(['loadingUser'])
  }
}
</script>