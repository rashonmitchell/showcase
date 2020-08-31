<template>
  <v-row>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="dialog = true"
          elevation="0"
          class="fixed-action-btn"
          color="#42b983"
          dark
          absolute
          attach
          right
          fab
          v-on="on" 
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Create a yogurt</span>
      </v-tooltip>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <!-------------------------  EDIT PROFILE BUTTON ------------------>
      <!-- <template v-slot:activator="{ on }">
        <v-btn
          v-on="on" elevation="0"
          class="fixed-action-btn"
          color="#42b983"
          dark
          absolute
          right
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template> -->
      <!-- <span>Create a yogurt</span> -->

      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            elevation="0"
            class="fixed-action-btn"
            color="#42b983"
            dark
            absolute
            attach
            right
            fab
            v-on="on" 
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Create a yogurt</span>
      </v-tooltip> -->
    <!-------------------------  END EDIT PROFILEBUTTON  ------------------>
      <v-card>
        <v-toolbar dark color="primario white--text">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="text-center">Create a yogurt</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <!-------------------------  EDIT FORM COMPONENT ------------------->
        <AppEditForm @click="dialog = false"></AppEditForm>
        <!-------------------------  END EDIT FORM COMPONENT ----------------->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppEditForm from '../profile/AppEditForm'
export default {
  components: {
    AppEditForm
  },
   data: () => ({
    type: Object,
    required: true,
    dialog: false,
  }),
  methods: {
    say(message) {
      alert(message)
    }
  }
}
</script>