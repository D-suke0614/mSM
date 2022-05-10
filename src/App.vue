<template>
  <v-app>

    <v-app-bar class="light-blue lighten-2 white--text text-sm-h4" clipped-left max-height="10vh">
      <v-app-bar-nav-icon class="white--text" variant="text" @click="drawer = !drawer"/>
      <v-toolbar-title class="text-sm-h4">mSM</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary absolute clipped>
      <v-list-item-group v-model="group" active-class="light-blue lighten-5 text--accent-4">
          <router-link :to="{path: '/'}" class="text-decoration-none black--text">
            <v-list-item>
              <v-list-item-title>Calender</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{path: '/clients'}" class="text-decoration-none black--text">
            <v-list-item>
              <v-list-item-title>Client</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{path: '/projects'}" class="text-decoration-none black--text">
            <v-list-item>
              <v-list-item-title>Project</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{path: '/activity'}" class="text-decoration-none black--text">
            <v-list-item>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{path: '/admin'}" class="text-decoration-none black--text">
            <v-list-item>
              <v-list-item-title>Employee</v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
    </v-navigation-drawer>

      <v-main height="90vh">
        <router-view></router-view>
      </v-main>
  </v-app>
</template>


<script>
export default {
  name: 'App',

  data: () => ({
    drawer: null,
  }),
};
</script>
