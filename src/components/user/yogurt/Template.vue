<template>
    <v-container>
        <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :items="items"
        :custom-sort="sort"
        :rows-per-page-items="[4]"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md5
          lg3
        >
          <v-card class="cal-item">
            <v-card-title>
              <h4>{{ props.item.name }}</h4>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn flat icon dark color="red" slot="activator">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Remove from Calendar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn flat icon dark color="green" slot="activator">
                  <v-icon>sync</v-icon>
                </v-btn>
                <span>Sync to Google Calendar</span>
              </v-tooltip>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">schedule</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.date }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.time }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">location_on</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.location }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">subject</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.description }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Attendees:</v-list-tile-title>
                  <v-list-tile-sub-title>{{ attendee }}</v-list-tile-sub-title>
                  <!-- <template v-for="(attendee, index) in item.attendees" >
                    <v-list-tile-sub-title v-bind:key="index">{{ attendee }}</v-list-tile-sub-title>
                  </template> -->
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
</template>

<script>
export default {
    name: 'Template',
    data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: [
      {
        value: false,
        name: 'Event One',
        date: 'Tuesday 20th February',
        time: '18:00 - 19:00',
        location: 'Belfast, Northern Ireland',
        description: 'Test Event Description for mocking out prototype',
        attendees: ['Rob Stark', 'Jon Snow'],
        color: 2,
        rawDate: '2018-04-29T20:00:00.000Z'
      },
      {
        value: false,
        name: 'Event Two',
        date: 'Thursday, 22th February',
        time: '17:00 - 18:00',
        location: 'Belfast, Northern Ireland',
        description: 'Test Event Description for mocking out prototype',
        attendees: ['Rob Stark', 'Jon Snow'],
        color: 12,
        rawDate: '2018-04-02T20:00:00.000Z'
      },
      {
        value: false,
        name: 'Event Three',
        date: 'Friday, 23th February',
        time: '15:00 - 17:00',
        location: 'Belfast, Northern Ireland',
        description: 'Test Event Description for mocking out prototype',
        attendees: ['Rob Stark', 'Jon Snow'],
        color: 12,
        rawDate: '2018-04-12T20:00:00.000Z'
      },
      {
        value: false,
        name: 'Event Four',
        date: 'Monday, 26th February',
        time: '18:00 - 19:00',
        location: 'Belfast, Northern Ireland',
        description: 'Test Event Description for mocking out prototype',
        attendees: ['Rob Stark', 'Jon Snow'],
        color: 12,
        rawDate: '2018-04-08T20:00:00.000Z'
      },
      {
        value: false,
        name: 'Event Five',
        date: 'Monday, 26th February',
        time: '18:00 - 19:00',
        location: 'Belfast, Northern Ireland',
        description: 'Test Event Description for mocking out prototype',
        attendees: ['Rob Stark', 'Jon Snow'],
        color: 12,
        rawDate: '2018-04-01T20:00:00.000Z'
      }
    ]
  }),
  methods: {
    sort(items, index, isDescending) {
      var sorted = false
      let temp;
      while(!sorted) {
        sorted = true
        for (var i = 0; i < items.length; i++) {
          if (items[i + 1]) {
            const date1 = new Date(Date.parse(items[i].rawDate))
            const date2 = new Date(Date.parse(items[i + 1].rawDate))
            //console.log(date1)
            if (date1 - date2 > 0) {
              sorted = false
              temp = items[i + 1]
              items[i + 1] = items[i]
              items[i] = temp
            }
          }
        }
      }
      
      return items
    }
  }
}
</script>