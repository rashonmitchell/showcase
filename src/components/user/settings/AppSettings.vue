<template>
    <v-row>
        <v-col>
            <v-card flat>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>Current language: </v-list-item-content> 
                        <LocaleChanger></LocaleChanger>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content class="pr-6">Theme mode: </v-list-item-content>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" icon @click="toggleThemeDarkMode">
                                <v-icon :style="{transform: `rotate(${$vuetify.theme.dark ? 0 : -190 }deg)`}">
                                    {{ icons.mdiThemeLightDark }}
                                </v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t(($vuetify.theme.dark ? 'light' : 'dark') + 'Mode') }}</span>
                        </v-tooltip>
                        <span class="pl-3">{{ $t(($vuetify.theme.dark ? 'dark' : 'light') + 'Mode') }} Current</span>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content class="pr-6">Color Changer: #TODO</v-list-item-content> 
                        <ColorChanger></ColorChanger>
                    </v-list-item>
                </v-list>
                
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mdiThemeLightDark } from '@mdi/js'
import LocaleChanger from '../../ui/LocaleChanger'
import ColorChanger from '../../ui/ColorChanger'
export default {
    components: {
        LocaleChanger,
        ColorChanger
    },
    data() {
        return {
        icons: { mdiThemeLightDark },
        }
    },
    methods: {
        toggleThemeDarkMode () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },
    },
}
</script>