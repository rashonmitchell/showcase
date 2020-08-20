<template>
  <v-container fluid>
    <v-layout row wrap class="text-center">
      <v-flex xs12  mt-5>
        <h1> {{ $t('tagLine') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          It's an application for daily affirmations<br>
        </blockquote>
      </v-flex>
      <!-- <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn color="primary" to="/signup">Sign Up</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
      </v-flex> -->
    </v-layout>

    <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="600"
    >
      <v-card-title>
        <v-icon class="mr-2">calendar_today</v-icon>
        <div>{{$t('yogurtOfTheDay')}}</div>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        " Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-text>
      <v-divider color="#212121" class="ma-3"></v-divider>
      <v-card-actions>
        <v-list-item class="grow">
          <v-row align="center" justify="end">
            <v-btn text>{{$t('read')}}</v-btn>
            <v-btn text>{{$t('bookmark')}}</v-btn>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>

            <!-- share dialog -->
            <v-dialog v-model="dialog" width="400" >
              <template v-slot:activator="{ on }">
                <v-icon class="mr-1" v-on="on">mdi-share-variant</v-icon>
              </template>
              <v-card>
                <v-card-title>
                  <span class="title font-weight-bold">{{$t('share')}}</span>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mx-0"
                    icon
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-card-title>
                <v-list>
                  <v-list-item >
                    <v-list-item-action>
                      <v-icon color="indigo">mdi-facebook</v-icon>
                    </v-list-item-action>
                    <v-card-title>{{$t('facebook')}}</v-card-title>
                  </v-list-item>
                  <v-list-item >
                    <v-list-item-action>
                      <v-icon color="cyan">mdi-twitter</v-icon>
                    </v-list-item-action>
                    <v-card-title>{{$t('twitter')}}</v-card-title>
                  </v-list-item>
                  <v-list-item >
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
            <span class="subheading">45</span>
            <!-- share dialog end -->
          </v-row>
          
        </v-list-item>
      </v-card-actions>
    </v-card>

    <v-fab-transition>
      <v-btn
        class=""
        color="#42b983"
        dark
        absolute
        right
        fab
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    </v-fab-transition>
  </v-container>

</template>
<script>
export default {
  name: "Home",
  data: () => ({
    copied: false,
    dialog: false,
    rating: 10,
  }),
  methods: {
    copy () {
      const markup = this.$refs.link
      markup.focus()
      document.execCommand('selectAll', false, null)
      this.copied = document.execCommand('copy')
    },
  },
};
</script>
<style lang="scss">
  .fixed-action-btn {
    position: fixed;
    right: 30px;
    bottom: 30px;
    padding-top: 15px;
    margin-bottom: 0;
    z-index: 998;
}
  
</style>
