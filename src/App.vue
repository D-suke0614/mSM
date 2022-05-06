<template>
  <v-app>

    <v-app-bar class="light-blue lighten-2 white--text text-sm-h4" clipped-left max-height="10vh">
      <v-app-bar-nav-icon class="white--text" variant="text" @click="drawer = !drawer"/>
      <v-toolbar-title class="text-sm-h4">mSM</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary absolute clipped>
      <v-list-item-group v-model="group" active-class="light-blue lighten-5 text--accent-4">
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
    </v-navigation-drawer>

      <v-main height="90vh">
        <!-- <Calender /> -->
        <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
// import Calender from './components/Calender/Calender.vue'
// import ClientIndex from './components/Client/ClientIndex.vue'

export default {
  name: 'App',
  components: {
    // Calender,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
