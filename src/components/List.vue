<template>
  <div>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-html="title" />
          <v-list-tile-sub-title v-html="subtitle" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
  </div>
</template>


<script>
    export default {
        props: ['title', 'subtitle']
    }
</script>