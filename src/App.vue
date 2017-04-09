<template>
  <div id="app">
    <v-app id="earthquake-app">
      <v-toolbar class="blue">
        <v-toolbar-title>Earthquake Data Map v0.0.1</v-toolbar-title>
         <v-spacer></v-spacer>
          <v-btn icon dark @click.native.stop="stacksUsed = true">
            <v-icon>more_vert</v-icon>
          </v-btn>
      </v-toolbar>
      <main>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
    </v-app>

  <v-modal v-model="stacksUsed" persistent>
    <v-card style="width:700px;">
        <v-card-text class="blue darken-1">
            <h2 class="title white--text">Tech stacks used</h2>
        </v-card-text>
        <v-card-text>
            <v-list two-line>
              <v-list-item v-for="stack in stacks" :key="stack.title">
                <v-list-tile-content>
                    <v-list-tile-title v-html="stack.title" />
                    <v-list-tile-sub-title v-html="stack.subtitle" />
                </v-list-tile-content>
              </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="stacksUsed = false" class="primary--text">Close</v-btn>
      </v-card-row>
    </v-card>
  </v-modal>

  </div>
</template>


<script>
export default {
  name: 'app',
  data() {
    return {
      stacksUsed: false,
      stacks: [
        {
          title: 'U.S. Geological Survey API',
          subtitle: 'https://www.usgs.gov/'
        },
        {
          title: 'Vue.js',
          subtitle: 'https://vuejs.org/'
        },
        {
          title: 'Vue Resource',
          subtitle: 'https://github.com/pagekit/vue-resource'
        },
        {
          title: 'Vue Moment',
          subtitle: 'https://github.com/brockpetrie/vue-moment'
        },
        {
          title: 'Vuetify',
          subtitle: 'https://vuetifyjs.com/'
        },
        {
          title: 'Google Maps API',
          subtitle: 'https://developers.google.com/maps/'
        }
      ]
    }
  }
}
</script>



