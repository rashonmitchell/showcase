<template>
	<v-col class="shrink" style="min-width: 200px;" justify="center" >
		<v-text-field v-model="color" :mask="mask" hide-details class="ma-0 pa-0" solo>
			<template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-palette</v-icon>
                </template>
                HEX Color
              </v-tooltip>
            </template>
			<template v-slot:append>
				<v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
					<template v-slot:activator="{ on }">
						<div :style="swatchStyle" v-on="on" />
					</template>
					<v-card>
						<v-card-text class="pa-0">
							<v-color-picker v-model="color" flat />
						</v-card-text>
					</v-card>
				</v-menu>
			</template>
		</v-text-field>
	</v-col>
</template>
<script>
export default {
    data: () => ({
		color: '#1976D2FF',
		mask: '!#XXXXXXXX',
		menu: false,
	}),
    computed: {
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        }
    }
}
</script>