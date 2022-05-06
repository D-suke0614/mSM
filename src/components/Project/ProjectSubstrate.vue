<template>
  <v-sheet elevation="6">
    <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item.id"
            class="tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-form v-on:submit.prevent="onSubmit">
          <v-text-field class="search" placeholder="案件名"></v-text-field>
          <v-text-field class="search" placeholder="顧客名"></v-text-field>
          <v-text-field class="search" placeholder="案件名"></v-text-field>
          <v-text-field class="search" placeholder="案件名"></v-text-field>
          <router-link to="/projects/list">
            <v-btn class="searchButton" color="primary" @click="search">検索</v-btn>
          </router-link>
        </v-form>
      </v-tab-item>
      <v-tab-item>
        <p>sample</p>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
export default {
  name: 'ProjectSearch',

  data () {
      return {
        tab: null,
        items: [
          { id: 0 , tab: '検索'},
          { id: 1 , tab: '登録'},
        ],
        headers: [
          {
            text: '案件ID',
            align: 'start',
            value: 'id',
          },
          { text: '案件名', value: 'title' },
          { text: '顧客名', value: 'title' },
          { text: '内容', value: 'title' },
          { text: '登録者', value: 'title' },
          { text: '更新者', value: 'title' },
          { text: '登録日', value: 'title' },
          { text: '更新日', value: 'title' },
        ],
      }
    },
}
</script>

<style>
  .search {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5vh;
  }
  .searchButton {
    margin-left: 25%;
    margin-bottom: 8vh;
    margin-top: 6vh;
  }
  .tab {
    height: 8vh;
  }
</style>
